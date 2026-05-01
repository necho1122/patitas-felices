'use client';

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	deleteDoc,
	addDoc,
} from 'firebase/firestore';
import type { ShopProduct } from '@/lib/products';
import { useAuth } from '@/components/auth/auth-context';
import { db } from '@/lib/firebase/client';

type PetSize = 'small' | 'medium' | 'large';

type UserProfile = {
	uid: string;
	fullName: string;
	email: string;
	phone: string;
};

type PetProfile = {
	id: string;
	name: string;
	type: 'dog' | 'cat' | 'other';
	breed: string;
	age: number;
	size: PetSize;
	weightKg: number;
	notes: string;
};

type CartItem = {
	productId: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
};

type Appointment = {
	id: string;
	petId: string;
	service: string;
	date: string;
	notes: string;
	status: 'scheduled' | 'cancelled';
};

type StoreContextValue = {
	ready: boolean;
	isAuthenticated: boolean;
	currentUserId: string | null;
	currentUser: UserProfile | null;
	pets: PetProfile[];
	cartItems: CartItem[];
	appointments: Appointment[];
	upsertUserProfile: (input: Omit<UserProfile, 'uid'>) => Promise<void>;
	addPetProfile: (input: Omit<PetProfile, 'id'>) => Promise<string>;
	addToCart: (product: ShopProduct) => Promise<void>;
	updateCartQuantity: (productId: number, quantity: number) => Promise<void>;
	removeFromCart: (productId: number) => Promise<void>;
	clearCart: () => Promise<void>;
	scheduleAppointment: (
		input: Omit<Appointment, 'id' | 'status'>,
	) => Promise<string>;
	cancelAppointment: (appointmentId: string) => Promise<void>;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function ensureAuth(uid: string | null): asserts uid is string {
	if (!uid) {
		throw new Error('AUTH_REQUIRED');
	}
}

function getDb() {
	if (!db) {
		throw new Error('FIREBASE_NOT_CONFIGURED');
	}

	return db;
}

function buildInitialUserProfile(
	uid: string,
	input: {
		displayName?: string | null;
		email?: string | null;
		phone?: string | null;
	},
): UserProfile {
	const email = (
		input.email?.trim().toLowerCase() || `user.${uid}@local.test`
	).slice(0, 120);
	const derivedName =
		input.displayName?.trim() || email.split('@')[0] || 'Usuario';
	const fullName = (derivedName.length >= 2 ? derivedName : 'Usuario').slice(
		0,
		80,
	);
	const rawPhone = input.phone?.trim() || '';
	const phone = (rawPhone.length >= 6 ? rawPhone : '000000').slice(0, 30);

	return {
		uid,
		fullName,
		email,
		phone,
	};
}

export function StoreProvider({ children }: { children: ReactNode }) {
	const { user, loading: authLoading } = useAuth();
	const currentUserId = user?.uid ?? null;

	const [ready, setReady] = useState(false);
	const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
	const [pets, setPets] = useState<PetProfile[]>([]);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [appointments, setAppointments] = useState<Appointment[]>([]);

	useEffect(() => {
		const loadAll = async () => {
			if (authLoading) {
				return;
			}

			if (!currentUserId || !db) {
				setCurrentUser(null);
				setPets([]);
				setCartItems([]);
				setAppointments([]);
				setReady(true);
				return;
			}

			setReady(false);
			try {
				const userRef = doc(db, 'users', currentUserId);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const data = userSnap.data() as Omit<UserProfile, 'uid'>;
					setCurrentUser({ uid: currentUserId, ...data });
				} else {
					const bootstrapProfile = buildInitialUserProfile(currentUserId, {
						displayName: user?.displayName,
						email: user?.email,
						phone: user?.phoneNumber,
					});

					await setDoc(
						userRef,
						{
							fullName: bootstrapProfile.fullName,
							email: bootstrapProfile.email,
							phone: bootstrapProfile.phone,
						},
						{ merge: true },
					);

					setCurrentUser(bootstrapProfile);
				}

				const petsSnap = await getDocs(
					collection(db, 'users', currentUserId, 'pets'),
				);
				setPets(
					petsSnap.docs.map((item) => ({
						id: item.id,
						...(item.data() as Omit<PetProfile, 'id'>),
					})),
				);

				const cartSnap = await getDocs(
					collection(db, 'users', currentUserId, 'cart'),
				);
				setCartItems(
					cartSnap.docs.map((item) => ({
						...(item.data() as CartItem),
					})),
				);

				const appointmentsSnap = await getDocs(
					collection(db, 'users', currentUserId, 'appointments'),
				);
				setAppointments(
					appointmentsSnap.docs.map((item) => ({
						id: item.id,
						...(item.data() as Omit<Appointment, 'id'>),
					})),
				);
			} finally {
				setReady(true);
			}
		};

		void loadAll();
	}, [authLoading, currentUserId, user]);

	const upsertUserProfile = async (input: Omit<UserProfile, 'uid'>) => {
		ensureAuth(currentUserId);
		const firestore = getDb();
		const payload: Omit<UserProfile, 'uid'> = {
			fullName: input.fullName.trim(),
			email: input.email.trim().toLowerCase(),
			phone: input.phone.trim(),
		};

		await setDoc(doc(firestore, 'users', currentUserId), payload, {
			merge: true,
		});
		setCurrentUser({ uid: currentUserId, ...payload });
	};

	const addPetProfile = async (
		input: Omit<PetProfile, 'id'>,
	): Promise<string> => {
		ensureAuth(currentUserId);
		const firestore = getDb();

		const payload: Omit<PetProfile, 'id'> = {
			name: input.name.trim(),
			type: input.type,
			breed: input.breed.trim(),
			age: input.age,
			size: input.size,
			weightKg: input.weightKg,
			notes: input.notes.trim(),
		};

		const ref = await addDoc(
			collection(firestore, 'users', currentUserId, 'pets'),
			payload,
		);
		const created = { id: ref.id, ...payload };
		setPets((prev) => [created, ...prev]);
		return ref.id;
	};

	const addToCart = async (product: ShopProduct) => {
		ensureAuth(currentUserId);
		const firestore = getDb();

		const existing = cartItems.find((item) => item.productId === product.id);
		const nextQuantity = existing ? existing.quantity + 1 : 1;

		const payload: CartItem = {
			productId: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			quantity: nextQuantity,
		};

		await setDoc(
			doc(firestore, 'users', currentUserId, 'cart', String(product.id)),
			payload,
		);
		setCartItems((prev) => {
			if (existing) {
				return prev.map((item) =>
					item.productId === product.id ? payload : item,
				);
			}
			return [payload, ...prev];
		});
	};

	const updateCartQuantity = async (productId: number, quantity: number) => {
		ensureAuth(currentUserId);
		const firestore = getDb();
		if (quantity <= 0) {
			await removeFromCart(productId);
			return;
		}

		await updateDoc(
			doc(firestore, 'users', currentUserId, 'cart', String(productId)),
			{
				quantity,
			},
		);

		setCartItems((prev) =>
			prev.map((item) =>
				item.productId === productId ? { ...item, quantity } : item,
			),
		);
	};

	const removeFromCart = async (productId: number) => {
		ensureAuth(currentUserId);
		const firestore = getDb();
		await deleteDoc(
			doc(firestore, 'users', currentUserId, 'cart', String(productId)),
		);
		setCartItems((prev) => prev.filter((item) => item.productId !== productId));
	};

	const clearCart = async () => {
		ensureAuth(currentUserId);
		const firestore = getDb();
		await Promise.all(
			cartItems.map((item) =>
				deleteDoc(
					doc(
						firestore,
						'users',
						currentUserId,
						'cart',
						String(item.productId),
					),
				),
			),
		);
		setCartItems([]);
	};

	const scheduleAppointment = async (
		input: Omit<Appointment, 'id' | 'status'>,
	): Promise<string> => {
		ensureAuth(currentUserId);
		const firestore = getDb();
		const payload: Omit<Appointment, 'id'> = {
			petId: input.petId,
			service: input.service,
			date: input.date,
			notes: input.notes.trim(),
			status: 'scheduled',
		};

		const ref = await addDoc(
			collection(firestore, 'users', currentUserId, 'appointments'),
			payload,
		);
		setAppointments((prev) => [{ id: ref.id, ...payload }, ...prev]);
		return ref.id;
	};

	const cancelAppointment = async (appointmentId: string) => {
		ensureAuth(currentUserId);
		const firestore = getDb();
		await updateDoc(
			doc(firestore, 'users', currentUserId, 'appointments', appointmentId),
			{
				status: 'cancelled',
			},
		);
		setAppointments((prev) =>
			prev.map((item) =>
				item.id === appointmentId ? { ...item, status: 'cancelled' } : item,
			),
		);
	};

	const value = useMemo<StoreContextValue>(
		() => ({
			ready,
			isAuthenticated: Boolean(user),
			currentUserId,
			currentUser,
			pets,
			cartItems,
			appointments,
			upsertUserProfile,
			addPetProfile,
			addToCart,
			updateCartQuantity,
			removeFromCart,
			clearCart,
			scheduleAppointment,
			cancelAppointment,
		}),
		[ready, user, currentUserId, currentUser, pets, cartItems, appointments],
	);

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}

export function useStore(): StoreContextValue {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error('useStore must be used within StoreProvider');
	}
	return context;
}

export type { UserProfile, PetProfile, CartItem, Appointment, PetSize };

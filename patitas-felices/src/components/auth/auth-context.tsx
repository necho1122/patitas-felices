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
	browserLocalPersistence,
	getRedirectResult,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	setPersistence,
	signInWithPopup,
	signInWithRedirect,
	sendEmailVerification,
	sendPasswordResetEmail,
	signOut,
	type User,
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from '@/lib/firebase/client';

type AuthContextValue = {
	user: User | null;
	loading: boolean;
	hasConfig: boolean;
	isAuthenticated: boolean;
	isSessionTrusted: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signInWithGoogle: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	resendVerification: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = useMemo(() => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({
			prompt: 'select_account',
		});
		return provider;
	}, []);

	useEffect(() => {
		if (!auth || !hasFirebaseConfig) {
			setLoading(false);
			return;
		}

		let isMounted = true;
		let unsubscribe = () => undefined;

		const initAuth = async () => {
			try {
				await setPersistence(auth, browserLocalPersistence);
				await getRedirectResult(auth);
			} catch {
				// Errors are handled by auth actions; keep listener active for state recovery.
			}

			if (!isMounted) {
				return;
			}

			unsubscribe = onAuthStateChanged(auth, (nextUser) => {
				setUser(nextUser);
				setLoading(false);
			});
		};

		void initAuth();

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, []);

	const signIn = async (email: string, password: string) => {
		if (!auth || !hasFirebaseConfig) {
			throw new Error('Firebase auth is not configured.');
		}

		const credential = await signInWithEmailAndPassword(
			auth,
			email.trim(),
			password,
		);

		if (!credential.user.emailVerified) {
			await signOut(auth);
			throw new Error('auth/email-not-verified');
		}
	};

	const signUp = async (email: string, password: string) => {
		if (!auth || !hasFirebaseConfig) {
			throw new Error('Firebase auth is not configured.');
		}

		const credential = await createUserWithEmailAndPassword(
			auth,
			email.trim(),
			password,
		);
		await sendEmailVerification(credential.user);
		await signOut(auth);
	};

	const signInWithGoogle = async () => {
		if (!auth || !hasFirebaseConfig) {
			throw new Error('Firebase auth is not configured.');
		}

		try {
			// Popup avoids missing-initial-state errors in storage-partitioned browsers.
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			const code =
				err && typeof err === 'object' && 'code' in err
					? String((err as { code?: unknown }).code)
					: '';

			if (
				code === 'auth/operation-not-supported-in-this-environment' ||
				code === 'auth/web-storage-unsupported'
			) {
				await signInWithRedirect(auth, googleProvider);
				return;
			}

			throw err;
		}
	};

	const resetPassword = async (email: string) => {
		if (!auth || !hasFirebaseConfig) {
			throw new Error('Firebase auth is not configured.');
		}

		await sendPasswordResetEmail(auth, email.trim());
	};

	const resendVerification = async () => {
		if (!auth || !hasFirebaseConfig || !auth.currentUser) {
			throw new Error('auth/no-current-user');
		}

		await sendEmailVerification(auth.currentUser);
	};

	const logout = async () => {
		if (!auth || !hasFirebaseConfig) {
			return;
		}

		await signOut(auth);
	};

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			loading,
			hasConfig: hasFirebaseConfig,
			isAuthenticated: Boolean(user),
			isSessionTrusted:
				Boolean(user) &&
				(user?.providerData.some((item) => item.providerId === 'google.com') ||
					Boolean(user?.emailVerified)),
			signIn,
			signUp,
			signInWithGoogle,
			resetPassword,
			resendVerification,
			logout,
		}),
		[user, loading, googleProvider],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}

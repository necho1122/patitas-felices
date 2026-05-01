'use client';

import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';
import styles from '@/app/panel/panel.module.css';
import { useAuth } from '@/components/auth/auth-context';
import { useStore } from '@/components/store/store-context';
import type { Lang } from '@/lib/i18n/types';
import type { PanelDictionary } from '@/lib/i18n/dictionaries';

export function UserPanelPageContent({
	lang,
	t,
}: {
	lang: Lang;
	t: PanelDictionary;
}) {
	const {
		currentUserId,
		currentUser,
		pets,
		cartItems,
		appointments,
		scheduleAppointment,
		cancelAppointment,
		clearCart,
	} = useStore();
	const { isAuthenticated, logout } = useAuth();
	const [scheduledOk, setScheduledOk] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState('');

	const myPets = useMemo(() => pets, [pets]);
	const myAppointments = useMemo(() => appointments, [appointments]);
	const cartTotal = useMemo(
		() => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
		[cartItems],
	);

	const servicesByLang =
		lang === 'es'
			? ['Spa Relajante', 'Grooming Premium', 'Plan Senior', 'Consulta General']
			: ['Relaxing Spa', 'Premium Grooming', 'Senior Plan', 'General Check'];

	const onSchedule = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!currentUserId || myPets.length === 0) {
			return;
		}

		setBusy(true);
		setError('');

		const formData = new FormData(event.currentTarget);
		const petId = String(formData.get('petId') ?? '');
		const service = String(formData.get('service') ?? '');
		const date = String(formData.get('date') ?? '');
		const notes = String(formData.get('notes') ?? '');

		if (!petId || !service || !date) {
			setBusy(false);
			return;
		}

		try {
			await scheduleAppointment({
				petId,
				service,
				date,
				notes,
			});

			setScheduledOk(true);
			event.currentTarget.reset();
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Schedule error';
			setError(message);
		} finally {
			setBusy(false);
		}
	};

	const petNameById = useMemo(() => {
		const entries = myPets.map((pet) => [pet.id, pet.name] as const);
		return new Map(entries);
	}, [myPets]);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<p className={styles.kicker}>{t.kicker}</p>
				<h1>{t.title}</h1>
				<p>{t.lead}</p>
				{isAuthenticated && (
					<button
						type='button'
						onClick={() => void logout()}
						className={styles.ghostButton}
					>
						{t.actions.logout}
					</button>
				)}
			</header>

			<main className={styles.main}>
				{!isAuthenticated ? (
					<section className={styles.section}>
						<p>
							{lang === 'es'
								? 'Debes iniciar sesion para ver tu panel.'
								: 'You must sign in to access your panel.'}
						</p>
						<Link
							href={`/${lang}/auth`}
							className={styles.primaryLink}
						>
							{lang === 'es' ? 'Iniciar sesion' : 'Sign in'}
						</Link>
					</section>
				) : !currentUser ? (
					<section className={styles.section}>
						<p>{t.emptyUser}</p>
						<Link
							href={`/${lang}/profile`}
							className={styles.primaryLink}
						>
							{t.createProfile}
						</Link>
					</section>
				) : (
					<>
						<section className={styles.section}>
							<div className={styles.sectionHead}>
								<h2>{t.sections.pets}</h2>
								<Link
									href={`/${lang}/profile`}
									className={styles.inlineLink}
								>
									{t.createProfile}
								</Link>
							</div>
							{myPets.length === 0 ? (
								<p>{t.pets.empty}</p>
							) : (
								<div className={styles.petsGrid}>
									{myPets.map((pet) => (
										<article
											key={pet.id}
											className={styles.petCard}
										>
											<h3>{pet.name}</h3>
											<p>
												<strong>{t.pets.meta.breed}:</strong> {pet.breed}
											</p>
											<p>
												<strong>{t.pets.meta.age}:</strong> {pet.age}
											</p>
											<p>
												<strong>{t.pets.meta.size}:</strong> {pet.size}
											</p>
											<p>
												<strong>{t.pets.meta.weight}:</strong> {pet.weightKg} kg
											</p>
											{pet.notes && (
												<p>
													<strong>{t.pets.meta.notes}:</strong> {pet.notes}
												</p>
											)}
										</article>
									))}
								</div>
							)}
						</section>

						<section className={styles.section}>
							<div className={styles.sectionHead}>
								<h2>{t.sections.appointments}</h2>
							</div>

							<form
								onSubmit={onSchedule}
								className={styles.form}
							>
								<label className={styles.field}>
									<span>{t.appointmentForm.pet}</span>
									<select
										name='petId'
										required
										defaultValue=''
									>
										<option
											value=''
											disabled
										>
											--
										</option>
										{myPets.map((pet) => (
											<option
												key={pet.id}
												value={pet.id}
											>
												{pet.name}
											</option>
										))}
									</select>
								</label>

								<label className={styles.field}>
									<span>{t.appointmentForm.service}</span>
									<select
										name='service'
										required
										defaultValue={servicesByLang[0]}
									>
										{servicesByLang.map((service) => (
											<option
												key={service}
												value={service}
											>
												{service}
											</option>
										))}
									</select>
								</label>

								<label className={styles.field}>
									<span>{t.appointmentForm.date}</span>
									<input
										type='datetime-local'
										name='date'
										required
									/>
								</label>

								<label className={styles.field}>
									<span>{t.appointmentForm.notes}</span>
									<textarea
										name='notes'
										rows={3}
									/>
								</label>

								<button
									type='submit'
									className={styles.primaryButton}
									disabled={myPets.length === 0 || busy}
								>
									{t.appointmentForm.submit}
								</button>

								{scheduledOk && (
									<p className={styles.success}>{t.appointmentForm.success}</p>
								)}
								{error && <p className={styles.error}>{error}</p>}
							</form>

							{myAppointments.length === 0 ? (
								<p>{t.appointments.empty}</p>
							) : (
								<div className={styles.list}>
									{myAppointments.map((item) => (
										<article
											key={item.id}
											className={styles.listItem}
										>
											<div>
												<p>
													<strong>{petNameById.get(item.petId) ?? '-'}</strong>
												</p>
												<p>{item.service}</p>
												<p>{new Date(item.date).toLocaleString()}</p>
												<p>
													{item.status === 'scheduled'
														? t.appointments.status.scheduled
														: t.appointments.status.cancelled}
												</p>
											</div>
											{item.status === 'scheduled' && (
												<button
													type='button'
													onClick={() => void cancelAppointment(item.id)}
													className={styles.ghostButton}
												>
													{t.appointments.cancel}
												</button>
											)}
										</article>
									))}
								</div>
							)}
						</section>

						<section className={styles.section}>
							<div className={styles.sectionHead}>
								<h2>{t.sections.cart}</h2>
							</div>
							{cartItems.length === 0 ? (
								<p>{t.cart.empty}</p>
							) : (
								<>
									<div className={styles.list}>
										{cartItems.map((item) => (
											<article
												key={item.productId}
												className={styles.listItem}
											>
												<div>
													<p>
														<strong>{item.title}</strong>
													</p>
													<p>
														{t.cart.items}: {item.quantity}
													</p>
												</div>
												<p>${(item.price * item.quantity).toFixed(2)}</p>
											</article>
										))}
									</div>
									<div className={styles.summaryRow}>
										<p>
											<strong>{t.cart.total}:</strong> ${cartTotal.toFixed(2)}
										</p>
										<button
											type='button'
											onClick={() => void clearCart()}
											className={styles.ghostButton}
										>
											{t.cart.clear}
										</button>
									</div>
								</>
							)}
						</section>
					</>
				)}
			</main>
		</div>
	);
}

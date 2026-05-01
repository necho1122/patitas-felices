'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import styles from '@/app/profile/profile.module.css';
import { useAuth } from '@/components/auth/auth-context';
import type { Lang } from '@/lib/i18n/types';
import type { ProfileDictionary } from '@/lib/i18n/dictionaries';
import { useStore, type PetSize } from '@/components/store/store-context';

export function ProfilePageContent({
	lang,
	t,
}: {
	lang: Lang;
	t: ProfileDictionary;
}) {
	const { upsertUserProfile, addPetProfile } = useStore();
	const { user, isAuthenticated } = useAuth();
	const [saved, setSaved] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const authHref = `/${lang}/auth`;
	const authText =
		lang === 'es'
			? 'Para guardar perfil y mascota debes iniciar sesion primero.'
			: 'You must sign in first to save your profile and pet data.';
	const authCta = lang === 'es' ? 'Iniciar sesion' : 'Sign in';

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isAuthenticated) {
			setError(authText);
			return;
		}

		setError('');
		setSaving(true);
		const form = event.currentTarget;
		const formData = new FormData(form);

		const ownerName = String(formData.get('ownerName') ?? '');
		const email = String(formData.get('email') ?? '');
		const phone = String(formData.get('phone') ?? '');
		const petName = String(formData.get('petName') ?? '');
		const petType = String(formData.get('petType') ?? 'dog') as
			| 'dog'
			| 'cat'
			| 'other';
		const breed = String(formData.get('breed') ?? '');
		const age = Number(formData.get('age') ?? 0);
		const size = String(formData.get('size') ?? 'medium') as PetSize;
		const weightKg = Number(formData.get('weight') ?? 0);
		const notes = String(formData.get('notes') ?? '');

		try {
			await upsertUserProfile({
				fullName: ownerName,
				email,
				phone,
			});

			await addPetProfile({
				name: petName,
				type: petType,
				breed,
				age,
				size,
				weightKg,
				notes,
			});

			setSaved(true);
			form.reset();
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Error saving profile';
			setError(message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<p className={styles.kicker}>{t.kicker}</p>
				<h1>{t.title}</h1>
				<p>{t.lead}</p>
			</header>

			<main className={styles.main}>
				{!isAuthenticated && (
					<div className={styles.authNotice}>
						<p>{authText}</p>
						<Link
							href={authHref}
							className={styles.backLink}
						>
							{authCta}
						</Link>
					</div>
				)}

				<form
					className={styles.form}
					onSubmit={onSubmit}
				>
					<div className={styles.grid}>
						<label className={styles.field}>
							<span>{t.fields.ownerName}</span>
							<input
								type='text'
								name='ownerName'
								placeholder={t.fields.ownerNamePlaceholder}
								required
							/>
						</label>

						<label className={styles.field}>
							<span>{t.fields.email}</span>
							<input
								type='email'
								name='email'
								defaultValue={user?.email ?? ''}
								placeholder={t.fields.emailPlaceholder}
								required
							/>
						</label>

						<label className={styles.field}>
							<span>{t.fields.phone}</span>
							<input
								type='tel'
								name='phone'
								placeholder={t.fields.phonePlaceholder}
								required
							/>
						</label>

						<label className={styles.field}>
							<span>{t.fields.petName}</span>
							<input
								type='text'
								name='petName'
								placeholder={t.fields.petNamePlaceholder}
								required
							/>
						</label>

						<label className={styles.field}>
							<span>{t.fields.petType}</span>
							<select
								name='petType'
								defaultValue='dog'
							>
								<option value='dog'>{t.fields.petTypeOptions.dog}</option>
								<option value='cat'>{t.fields.petTypeOptions.cat}</option>
								<option value='other'>{t.fields.petTypeOptions.other}</option>
							</select>
						</label>

						<label className={styles.field}>
							<span>{t.fields.breed}</span>
							<input
								type='text'
								name='breed'
								placeholder={t.fields.breedPlaceholder}
								required
							/>
						</label>

						<label className={styles.field}>
							<span>{t.fields.age}</span>
							<input
								type='number'
								name='age'
								placeholder={t.fields.agePlaceholder}
								min={0}
								max={30}
								required
							/>
						</label>

						<label className={styles.field}>
							<span>{t.fields.size}</span>
							<select
								name='size'
								defaultValue='medium'
							>
								<option value='small'>{t.fields.sizeOptions.small}</option>
								<option value='medium'>{t.fields.sizeOptions.medium}</option>
								<option value='large'>{t.fields.sizeOptions.large}</option>
							</select>
						</label>

						<label className={styles.field}>
							<span>{t.fields.weight}</span>
							<input
								type='number'
								name='weight'
								placeholder={t.fields.weightPlaceholder}
								min={0.1}
								max={120}
								step='0.1'
								required
							/>
						</label>
					</div>

					<label className={styles.field}>
						<span>{t.fields.notes}</span>
						<textarea
							name='notes'
							rows={5}
							placeholder={t.fields.notesPlaceholder}
						/>
					</label>

					<div className={styles.actions}>
						<button
							type='submit'
							disabled={!isAuthenticated || saving}
						>
							{t.submit}
						</button>
						<Link
							href={`/${lang}/panel`}
							className={styles.backLink}
						>
							{t.goToPanel}
						</Link>
						<Link
							href={`/${lang}`}
							className={styles.backLink}
						>
							{t.backToHome}
						</Link>
					</div>

					{saved && <p className={styles.success}>{t.success}</p>}
					{error && <p className={styles.error}>{error}</p>}
				</form>
			</main>
		</div>
	);
}

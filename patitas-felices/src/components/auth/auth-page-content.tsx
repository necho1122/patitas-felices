'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/app/auth/auth.module.css';
import { useAuth } from '@/components/auth/auth-context';
import { getFriendlyAuthError } from '@/lib/firebase/auth-errors';
import { missingFirebaseConfigKeys } from '@/lib/firebase/client';
import type { Lang } from '@/lib/i18n/types';

function isStrongPassword(value: string): boolean {
	if (value.length < 8) {
		return false;
	}

	const hasUpper = /[A-Z]/.test(value);
	const hasLower = /[a-z]/.test(value);
	const hasNumber = /[0-9]/.test(value);
	const hasSpecial = /[^A-Za-z0-9]/.test(value);
	return hasUpper && hasLower && hasNumber && hasSpecial;
}

export function AuthPageContent({ lang }: { lang: Lang }) {
	const router = useRouter();
	const {
		user,
		loading,
		hasConfig,
		isSessionTrusted,
		signIn,
		signUp,
		signInWithGoogle,
		resetPassword,
		resendVerification,
		logout,
	} = useAuth();

	const [mode, setMode] = useState<'signin' | 'signup'>('signin');
	const [error, setError] = useState('');
	const [info, setInfo] = useState('');
	const [pending, setPending] = useState(false);

	const isEs = lang === 'es';

	const text = useMemo(
		() => ({
			title: isEs ? 'Acceso seguro' : 'Secure access',
			lead: isEs
				? 'Inicia sesion o crea tu cuenta para proteger tus datos, compras y citas.'
				: 'Sign in or create your account to protect your data, purchases, and appointments.',
			signIn: isEs ? 'Iniciar sesion' : 'Sign in',
			signUp: isEs ? 'Crear cuenta' : 'Create account',
			email: isEs ? 'Correo' : 'Email',
			password: isEs ? 'Contrasena' : 'Password',
			confirmPassword: isEs ? 'Confirmar contrasena' : 'Confirm password',
			passwordHint: isEs
				? 'Minimo 8 caracteres, incluyendo mayuscula, minuscula, numero y simbolo.'
				: 'Minimum 8 chars including uppercase, lowercase, number and symbol.',
			submitSignIn: isEs ? 'Entrar' : 'Continue',
			submitSignUp: isEs ? 'Registrarme' : 'Register',
			toPanel: isEs ? 'Ir al panel' : 'Go to panel',
			logout: isEs ? 'Cerrar sesion' : 'Log out',
			google: isEs ? 'Continuar con Google' : 'Continue with Google',
			forgot: isEs ? 'Recuperar contrasena' : 'Reset password',
			resendVerification: isEs
				? 'Reenviar correo de verificacion'
				: 'Resend verification email',
			notConfigured: isEs
				? 'Firebase no esta configurado en tiempo de ejecucion. Agrega tus variables en .env.local y reinicia el servidor.'
				: 'Firebase is not configured at runtime. Add your variables to .env.local and restart the dev server.',
			verifySent: isEs
				? 'Cuenta creada. Revisa tu correo para verificar antes de iniciar sesion.'
				: 'Account created. Verify your email before signing in.',
			passwordMismatch: isEs
				? 'La confirmacion de contrasena no coincide.'
				: 'Password confirmation does not match.',
			passwordWeak: isEs
				? 'La contrasena no cumple los requisitos de seguridad.'
				: 'Password does not meet security requirements.',
			resetSent: isEs
				? 'Si el correo existe, enviamos instrucciones para restablecer la contrasena.'
				: 'If the email exists, reset instructions were sent.',
			verificationSent: isEs
				? 'Te enviamos un nuevo correo de verificacion.'
				: 'A new verification email was sent.',
		}),
		[isEs],
	);

	const missingKeysText = missingFirebaseConfigKeys.join(', ');

	useEffect(() => {
		if (user && isSessionTrusted) {
			router.replace(`/${lang}/panel`);
		}
	}, [user, isSessionTrusted, lang, router]);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError('');
		setInfo('');
		setPending(true);

		try {
			const formData = new FormData(event.currentTarget);
			const email = String(formData.get('email') ?? '').trim();
			const password = String(formData.get('password') ?? '');
			const confirmPassword = String(formData.get('confirmPassword') ?? '');

			if (mode === 'signup') {
				if (!isStrongPassword(password)) {
					throw new Error(text.passwordWeak);
				}
				if (password !== confirmPassword) {
					throw new Error(text.passwordMismatch);
				}

				await signUp(email, password);
				setInfo(text.verifySent);
				setMode('signin');
				return;
			}

			await signIn(email, password);
			router.push(`/${lang}/panel`);
		} catch (err) {
			if (err instanceof Error && !err.message.startsWith('auth/')) {
				setError(err.message);
			} else {
				setError(getFriendlyAuthError(err, lang));
			}
		} finally {
			setPending(false);
		}
	};

	const onGoogleSignIn = async () => {
		setError('');
		setInfo('');
		setPending(true);
		try {
			await signInWithGoogle();
		} catch (err) {
			setError(getFriendlyAuthError(err, lang));
		} finally {
			setPending(false);
		}
	};

	const onResetPassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError('');
		setInfo('');
		setPending(true);
		try {
			const formData = new FormData(event.currentTarget);
			const email = String(formData.get('email') ?? '').trim();
			await resetPassword(email);
			setInfo(text.resetSent);
		} catch (err) {
			setError(getFriendlyAuthError(err, lang));
		} finally {
			setPending(false);
		}
	};

	const onResendVerification = async () => {
		setError('');
		setInfo('');
		setPending(true);
		try {
			await resendVerification();
			setInfo(text.verificationSent);
		} catch (err) {
			setError(getFriendlyAuthError(err, lang));
		} finally {
			setPending(false);
		}
	};

	return (
		<div className={styles.page}>
			<section className={styles.card}>
				<h1>{text.title}</h1>
				<p>{text.lead}</p>

				{!hasConfig && (
					<div className={styles.warningBox}>
						<p className={styles.warning}>{text.notConfigured}</p>
						{missingFirebaseConfigKeys.length > 0 && (
							<p className={styles.warningDetails}>
								{isEs ? 'Faltan:' : 'Missing:'} {missingKeysText}
							</p>
						)}
					</div>
				)}

				{user ? (
					<div className={styles.loggedBox}>
						<p>{user.email}</p>
						{!isSessionTrusted && (
							<button
								type='button'
								onClick={() => void onResendVerification()}
								className={styles.secondaryBtn}
								disabled={pending}
							>
								{text.resendVerification}
							</button>
						)}
						<div className={styles.actions}>
							{isSessionTrusted ? (
								<Link
									href={`/${lang}/panel`}
									className={styles.primaryLink}
								>
									{text.toPanel}
								</Link>
							) : null}
							<button
								type='button'
								onClick={() => void logout()}
								className={styles.secondaryBtn}
							>
								{text.logout}
							</button>
						</div>
					</div>
				) : (
					<>
						<button
							type='button'
							onClick={() => void onGoogleSignIn()}
							disabled={pending || loading || !hasConfig}
							className={styles.googleBtn}
						>
							{text.google}
						</button>

						<div className={styles.divider}>
							<span>{isEs ? 'o con correo' : 'or with email'}</span>
						</div>

						<form
							onSubmit={(event) => void onSubmit(event)}
							className={styles.form}
						>
							<div className={styles.modeSwitch}>
								<button
									type='button'
									onClick={() => setMode('signin')}
									className={
										mode === 'signin' ? styles.activeMode : styles.modeBtn
									}
								>
									{text.signIn}
								</button>
								<button
									type='button'
									onClick={() => setMode('signup')}
									className={
										mode === 'signup' ? styles.activeMode : styles.modeBtn
									}
								>
									{text.signUp}
								</button>
							</div>

							<label className={styles.field}>
								<span>{text.email}</span>
								<input
									type='email'
									name='email'
									required
								/>
							</label>

							<label className={styles.field}>
								<span>{text.password}</span>
								<input
									type='password'
									name='password'
									minLength={8}
									required
								/>
								<small>{text.passwordHint}</small>
							</label>

							{mode === 'signup' && (
								<label className={styles.field}>
									<span>{text.confirmPassword}</span>
									<input
										type='password'
										name='confirmPassword'
										minLength={8}
										required
									/>
								</label>
							)}

							<button
								type='submit'
								disabled={pending || loading || !hasConfig}
								className={styles.submitBtn}
							>
								{mode === 'signin' ? text.submitSignIn : text.submitSignUp}
							</button>
						</form>

						<form
							onSubmit={(event) => void onResetPassword(event)}
							className={styles.resetForm}
						>
							<label className={styles.field}>
								<span>{text.forgot}</span>
								<input
									type='email'
									name='email'
									required
								/>
							</label>
							<button
								type='submit'
								disabled={pending || loading || !hasConfig}
								className={styles.secondaryBtn}
							>
								{text.forgot}
							</button>
						</form>
					</>
				)}

				{error && <p className={styles.error}>{error}</p>}
				{info && <p className={styles.info}>{info}</p>}
			</section>
		</div>
	);
}

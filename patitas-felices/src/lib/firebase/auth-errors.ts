type AuthErrorMap = Record<string, { es: string; en: string }>;

const AUTH_ERROR_MESSAGES: AuthErrorMap = {
	'auth/invalid-email': {
		es: 'El correo no tiene un formato valido.',
		en: 'The email format is invalid.',
	},
	'auth/invalid-credential': {
		es: 'Correo o contrasena incorrectos.',
		en: 'Invalid email or password.',
	},
	'auth/user-disabled': {
		es: 'Esta cuenta fue deshabilitada.',
		en: 'This account has been disabled.',
	},
	'auth/email-already-in-use': {
		es: 'Este correo ya esta registrado.',
		en: 'This email is already registered.',
	},
	'auth/weak-password': {
		es: 'La contrasena es demasiado debil.',
		en: 'The password is too weak.',
	},
	'auth/too-many-requests': {
		es: 'Demasiados intentos. Espera un momento e intenta de nuevo.',
		en: 'Too many attempts. Please wait and try again.',
	},
	'auth/popup-closed-by-user': {
		es: 'El inicio de sesion con Google fue cancelado.',
		en: 'Google sign in was cancelled.',
	},
	'auth/email-not-verified': {
		es: 'Debes verificar tu correo antes de iniciar sesion.',
		en: 'You must verify your email before signing in.',
	},
	'auth/no-current-user': {
		es: 'No hay una sesion activa para reenviar verificacion.',
		en: 'No active session available to resend verification.',
	},
	'auth/operation-not-allowed': {
		es: 'Este metodo de acceso no esta habilitado en Firebase.',
		en: 'This sign-in method is not enabled in Firebase.',
	},
	'auth/unauthorized-domain': {
		es: 'Este dominio no esta autorizado en Firebase Authentication.',
		en: 'This domain is not authorized in Firebase Authentication.',
	},
	'auth/invalid-api-key': {
		es: 'La API key de Firebase no es valida para este proyecto.',
		en: 'The Firebase API key is not valid for this project.',
	},
	'auth/missing-initial-state': {
		es: 'No se pudo completar el acceso con Google en este navegador. Habilita almacenamiento del sitio o intenta de nuevo con ventana normal.',
		en: 'Google sign in could not be completed in this browser. Enable site storage or try again in a normal window.',
	},
	'firebase/configuration-not-found': {
		es: 'Firebase Authentication no esta configurado para esta API key/proyecto.',
		en: 'Firebase Authentication is not configured for this API key/project.',
	},
};

function extractCode(error: unknown): string | null {
	if (!(error instanceof Error)) {
		return null;
	}

	const bracketMatch = error.message.match(/auth\/[a-z\-]+/i);
	if (bracketMatch) {
		return bracketMatch[0].toLowerCase();
	}

	const maybeWithCode = error as { code?: unknown };
	if (typeof maybeWithCode.code === 'string') {
		return String(maybeWithCode.code).toLowerCase();
	}

	const upperMessage = error.message.toUpperCase();
	if (upperMessage.includes('CONFIGURATION_NOT_FOUND')) {
		return 'firebase/configuration-not-found';
	}
	if (upperMessage.includes('INVALID_API_KEY')) {
		return 'auth/invalid-api-key';
	}
	if (upperMessage.includes('MISSING INITIAL STATE')) {
		return 'auth/missing-initial-state';
	}

	return null;
}

export function getFriendlyAuthError(
	error: unknown,
	lang: 'es' | 'en',
): string {
	const code = extractCode(error);
	if (!code) {
		return lang === 'es'
			? 'No fue posible completar la autenticacion.'
			: 'Unable to complete authentication.';
	}

	const known = AUTH_ERROR_MESSAGES[code];
	if (known) {
		return known[lang];
	}

	return lang === 'es'
		? 'No fue posible completar la autenticacion.'
		: 'Unable to complete authentication.';
}

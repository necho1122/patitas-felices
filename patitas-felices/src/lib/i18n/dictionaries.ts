import type { Lang } from './types';

const HOME_DICTIONARY = {
	en: {
		brandAlt: 'Patitas Felices logo',
		nav: {
			services: 'Services',
			servicesMenu: ['Relaxing Spa', 'Premium Grooming', 'Senior Plan'],
			shop: 'Shop',
			profile: 'Create Profile',
			panel: 'User Panel',
			blog: 'Blog',
			contact: 'Contact',
		},
		hero: {
			titleLine1: 'GROOMING AND SUPPLIES',
			titleLine2: 'AT THE BEST RATE',
			lead: 'Little pets for a big heart: everything your pet needs in one place, with warm and professional care.',
			imageAlt: 'Patitas Felices groomer with dogs',
			badgeLeft: 'Professional grooming',
			badgeRight: 'At-home service',
		},
		services: {
			kicker: 'Core Services',
			title: 'Care routines focused on health and style',
			items: [
				{
					title: 'Relaxing Spa',
					text: 'Bath, deep cleansing, gentle drying, and soft massage to reduce stress.',
				},
				{
					title: 'Premium Grooming',
					text: 'Breed-specific cuts, paw and face shaping, ear cleaning, and nail trimming.',
				},
				{
					title: 'Senior Plan',
					text: 'Special routine for senior pets with patient care and hypoallergenic products.',
				},
			],
		},
		shop: {
			kicker: 'Shop',
			title: 'Accessories, clothes, and toys for every stage of your pet',
			lead: 'Explore a quick preview and visit the full store to see all available products.',
			cta: 'Go to full shop',
			fallback: 'We could not load preview products right now.',
		},
		contact: {
			kicker: 'Contact',
			title: 'Book grooming or request the mobile van',
			scheduleLabel: 'Hours',
			schedule: 'Mon to Sat, 9:00 - 19:00',
			name: 'Name',
			namePlaceholder: 'Your name',
			service: 'Service',
			selectOption: 'Select an option',
			atHome: 'At-home service',
			message: 'Message',
			messagePlaceholder: 'Tell us about your pet',
			submit: 'Send request',
		},
		language: {
			label: 'Language',
			en: 'EN',
			es: 'ES',
		},
	},
	es: {
		brandAlt: 'Logo de Patitas Felices',
		nav: {
			services: 'Servicios',
			servicesMenu: ['Spa Relajante', 'Grooming Premium', 'Plan Senior'],
			shop: 'Tienda',
			profile: 'Crear perfil',
			panel: 'Panel usuario',
			blog: 'Blog',
			contact: 'Contacto',
		},
		hero: {
			titleLine1: 'GROOMING Y ACCESORIOS',
			titleLine2: 'AL MEJOR PRECIO',
			lead: 'Patitas pequenas, amor gigante: todo lo que tu mascota necesita en un solo lugar, con atencion profesional y calida.',
			imageAlt: 'Groomer de Patitas Felices con perritos',
			badgeLeft: 'Grooming profesional',
			badgeRight: 'Servicio a domicilio',
		},
		services: {
			kicker: 'Servicios principales',
			title: 'Rutinas de cuidado con foco en salud y estilo',
			items: [
				{
					title: 'Spa Relajante',
					text: 'Bano, limpieza profunda, secado delicado y masaje suave para reducir estres.',
				},
				{
					title: 'Grooming Premium',
					text: 'Corte por raza, perfilado de patas y rostro, limpieza de oidos y corte de unas.',
				},
				{
					title: 'Plan Senior',
					text: 'Rutina especial para mascotas mayores con atencion paciente y productos hipoalergenicos.',
				},
			],
		},
		shop: {
			kicker: 'Shop',
			title: 'Accesorios, ropa y juguetes para cada etapa de tu mascota',
			lead: 'Explora una muestra rapida y entra a la tienda completa para ver todos los productos disponibles.',
			cta: 'Ir a tienda completa',
			fallback: 'No pudimos cargar productos de muestra en este momento.',
		},
		contact: {
			kicker: 'Contacto',
			title: 'Agenda grooming o solicita visita de la van',
			scheduleLabel: 'Horario',
			schedule: 'Lun a Sab, 9:00 - 19:00',
			name: 'Nombre',
			namePlaceholder: 'Tu nombre',
			service: 'Servicio',
			selectOption: 'Selecciona una opcion',
			atHome: 'Servicio a domicilio',
			message: 'Mensaje',
			messagePlaceholder: 'Cuentanos sobre tu mascota',
			submit: 'Enviar solicitud',
		},
		language: {
			label: 'Idioma',
			en: 'EN',
			es: 'ES',
		},
	},
} as const;

const SHOP_DICTIONARY = {
	en: {
		kicker: 'Patitas Felices Shop',
		title: 'Main store for pet products',
		description:
			'Test catalog loaded from a free API while we integrate our own database.',
		back: 'Back to home',
		emptyTitle: 'No products available right now',
		emptyText: 'Please try again in a few minutes.',
		add: 'Add',
		languageLabel: 'Language',
		languageOptions: {
			en: 'EN',
			es: 'ES',
		},
	},
	es: {
		kicker: 'Patitas Felices Shop',
		title: 'Tienda principal de productos para mascotas',
		description:
			'Catalogo de prueba cargado desde API gratuita mientras integramos base de datos propia.',
		back: 'Volver al inicio',
		emptyTitle: 'No hay productos disponibles por ahora',
		emptyText: 'Intenta de nuevo en unos minutos.',
		add: 'Agregar',
		languageLabel: 'Idioma',
		languageOptions: {
			en: 'EN',
			es: 'ES',
		},
	},
} as const;

const PROFILE_DICTIONARY = {
	en: {
		kicker: 'User Profile',
		title: 'Create your account and your pet profile',
		lead: 'Register your details to manage appointments, preferences, and your pet history in one place.',
		fields: {
			ownerName: 'Full name',
			ownerNamePlaceholder: 'Your full name',
			email: 'Email',
			emailPlaceholder: 'you@example.com',
			phone: 'Phone',
			phonePlaceholder: '+1 555 123 4567',
			petName: 'Pet name',
			petNamePlaceholder: 'Your pet name',
			petType: 'Pet type',
			petTypeOptions: {
				dog: 'Dog',
				cat: 'Cat',
				other: 'Other',
			},
			breed: 'Breed',
			breedPlaceholder: 'Ex: Golden Retriever',
			age: 'Age',
			agePlaceholder: 'Ex: 3',
			size: 'Size',
			sizeOptions: {
				small: 'Small',
				medium: 'Medium',
				large: 'Large',
			},
			weight: 'Weight (kg)',
			weightPlaceholder: 'Ex: 12.5',
			notes: 'Notes',
			notesPlaceholder: 'Allergies, behavior, or special care instructions',
		},
		submit: 'Create profile',
		success: 'Profile saved successfully.',
		goToPanel: 'Go to user panel',
		backToHome: 'Back to home',
	},
	es: {
		kicker: 'Perfil de usuario',
		title: 'Crea tu cuenta y el perfil de tu mascota',
		lead: 'Registra tus datos para gestionar citas, preferencias e historial de tu mascota en un solo lugar.',
		fields: {
			ownerName: 'Nombre completo',
			ownerNamePlaceholder: 'Tu nombre completo',
			email: 'Correo',
			emailPlaceholder: 'tu@correo.com',
			phone: 'Telefono',
			phonePlaceholder: '+52 55 1234 5678',
			petName: 'Nombre de la mascota',
			petNamePlaceholder: 'Nombre de tu mascota',
			petType: 'Tipo de mascota',
			petTypeOptions: {
				dog: 'Perro',
				cat: 'Gato',
				other: 'Otro',
			},
			breed: 'Raza',
			breedPlaceholder: 'Ej: Golden Retriever',
			age: 'Edad',
			agePlaceholder: 'Ej: 3',
			size: 'Tamano',
			sizeOptions: {
				small: 'Pequeno',
				medium: 'Mediano',
				large: 'Grande',
			},
			weight: 'Peso (kg)',
			weightPlaceholder: 'Ej: 12.5',
			notes: 'Notas',
			notesPlaceholder: 'Alergias, comportamiento o cuidados especiales',
		},
		submit: 'Crear perfil',
		success: 'Perfil guardado correctamente.',
		goToPanel: 'Ir al panel de usuario',
		backToHome: 'Volver al inicio',
	},
} as const;

const PANEL_DICTIONARY = {
	en: {
		kicker: 'User Panel',
		title: 'Control center for your pets and appointments',
		lead: 'Manage pet details, schedule services, and track your cart in one place.',
		actions: {
			logout: 'Log out',
		},
		emptyUser: 'No profile selected yet. Create your profile to start.',
		createProfile: 'Create profile',
		sections: {
			pets: 'Pet profiles',
			appointments: 'Appointments',
			cart: 'Cart summary',
		},
		pets: {
			empty: 'You do not have pets registered yet.',
			meta: {
				breed: 'Breed',
				age: 'Age',
				size: 'Size',
				weight: 'Weight',
				notes: 'Notes',
			},
		},
		appointmentForm: {
			title: 'Schedule a new appointment',
			pet: 'Pet',
			service: 'Service',
			date: 'Date and time',
			notes: 'Notes',
			submit: 'Schedule appointment',
			success: 'Appointment scheduled successfully.',
		},
		appointments: {
			empty: 'You have no appointments yet.',
			status: {
				scheduled: 'Scheduled',
				cancelled: 'Cancelled',
			},
			cancel: 'Cancel',
		},
		cart: {
			empty: 'Your cart is empty.',
			items: 'Items',
			total: 'Total',
			clear: 'Clear cart',
		},
	},
	es: {
		kicker: 'Panel de usuario',
		title: 'Centro de control para tus mascotas y citas',
		lead: 'Gestiona detalles de mascotas, agenda servicios y revisa tu carrito en un solo lugar.',
		actions: {
			logout: 'Cerrar sesion',
		},
		emptyUser:
			'Aun no hay un perfil seleccionado. Crea tu perfil para empezar.',
		createProfile: 'Crear perfil',
		sections: {
			pets: 'Perfiles de mascotas',
			appointments: 'Citas',
			cart: 'Resumen de carrito',
		},
		pets: {
			empty: 'No tienes mascotas registradas todavia.',
			meta: {
				breed: 'Raza',
				age: 'Edad',
				size: 'Tamano',
				weight: 'Peso',
				notes: 'Notas',
			},
		},
		appointmentForm: {
			title: 'Agendar una nueva cita',
			pet: 'Mascota',
			service: 'Servicio',
			date: 'Fecha y hora',
			notes: 'Notas',
			submit: 'Agendar cita',
			success: 'Cita agendada correctamente.',
		},
		appointments: {
			empty: 'Aun no tienes citas registradas.',
			status: {
				scheduled: 'Programada',
				cancelled: 'Cancelada',
			},
			cancel: 'Cancelar',
		},
		cart: {
			empty: 'Tu carrito esta vacio.',
			items: 'Articulos',
			total: 'Total',
			clear: 'Vaciar carrito',
		},
	},
} as const;

export type HomeDictionary = (typeof HOME_DICTIONARY)[Lang];
export type ShopDictionary = (typeof SHOP_DICTIONARY)[Lang];
export type ProfileDictionary = (typeof PROFILE_DICTIONARY)[Lang];
export type PanelDictionary = (typeof PANEL_DICTIONARY)[Lang];

export function getHomeDictionary(lang: Lang): HomeDictionary {
	return HOME_DICTIONARY[lang];
}

export function getShopDictionary(lang: Lang): ShopDictionary {
	return SHOP_DICTIONARY[lang];
}

export function getProfileDictionary(lang: Lang): ProfileDictionary {
	return PROFILE_DICTIONARY[lang];
}

export function getPanelDictionary(lang: Lang): PanelDictionary {
	return PANEL_DICTIONARY[lang];
}

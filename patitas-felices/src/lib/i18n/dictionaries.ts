import type { Lang } from './types';

const HOME_DICTIONARY = {
	en: {
		brandAlt: 'Patitas Felices logo',
		nav: {
			services: 'Services',
			servicesMenu: ['Relaxing Spa', 'Premium Grooming', 'Senior Plan'],
			shop: 'Shop',
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

export type HomeDictionary = (typeof HOME_DICTIONARY)[Lang];
export type ShopDictionary = (typeof SHOP_DICTIONARY)[Lang];

export function getHomeDictionary(lang: Lang): HomeDictionary {
	return HOME_DICTIONARY[lang];
}

export function getShopDictionary(lang: Lang): ShopDictionary {
	return SHOP_DICTIONARY[lang];
}

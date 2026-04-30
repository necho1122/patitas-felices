export type ShopProduct = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
};

type ApiProduct = ShopProduct & {
	rating?: {
		rate: number;
		count: number;
	};
};

const API_URL = 'https://fakestoreapi.com/products';

const PET_PRODUCT_PRESETS = [
	{
		title: 'Arnes comodo para paseo diario',
		category: 'Paseo',
		description:
			'Diseno ligero y resistente para caminatas comodas, con ajuste suave para mascotas activas.',
	},
	{
		title: 'Sueter suave para mascotas pequenas',
		category: 'Ropa',
		description:
			'Prenda comoda para temporada fresca con tacto agradable y ajuste pensado para uso diario.',
	},
	{
		title: 'Juguete interactivo de estimulo',
		category: 'Juguetes',
		description:
			'Accesorio ideal para mantener el juego, el movimiento y la atencion de tu mascota en casa.',
	},
	{
		title: 'Cama acolchada de descanso',
		category: 'Descanso',
		description:
			'Base suave con soporte ligero para siestas relajadas y momentos de bienestar.',
	},
	{
		title: 'Kit de higiene esencial',
		category: 'Higiene',
		description:
			'Seleccion de articulos de cuidado diario para mantener limpieza y confort entre visitas al spa.',
	},
	{
		title: 'Collar con acabado premium',
		category: 'Accesorios',
		description:
			'Collar decorativo y funcional con estilo limpio para combinar con salidas y sesiones de grooming.',
	},
	{
		title: 'Manta ligera para transportadora',
		category: 'Descanso',
		description:
			'Textura suave y practica para viajes, transportadora o rincones de descanso en casa.',
	},
	{
		title: 'Snack funcional de recompensa',
		category: 'Snacks',
		description:
			'Premio de apoyo para entrenamiento y rutinas de bienestar con porciones faciles de servir.',
	},
];

const FALLBACK_PRODUCTS: ShopProduct[] = PET_PRODUCT_PRESETS.map(
	(preset, index) => ({
		id: index + 1000,
		title: preset.title,
		category: preset.category,
		description: preset.description,
		image: index % 2 === 0 ? '/logo-patitas.webp' : '/van-patitas.webp',
		price: 14 + index * 3,
	}),
);

function mapToPetProduct(product: ApiProduct, index: number): ShopProduct {
	const preset = PET_PRODUCT_PRESETS[index % PET_PRODUCT_PRESETS.length];

	return {
		id: product.id,
		title: preset.title,
		category: preset.category,
		description: preset.description,
		image: product.image,
		price: product.price,
	};
}

function getFallbackProducts(limit?: number): ShopProduct[] {
	return limit ? FALLBACK_PRODUCTS.slice(0, limit) : FALLBACK_PRODUCTS;
}

export async function getProducts(limit?: number): Promise<ShopProduct[]> {
	const url = limit ? `${API_URL}?limit=${limit}` : API_URL;

	try {
		const response = await fetch(url, {
			next: { revalidate: 1800 },
		});

		if (!response.ok) {
			return getFallbackProducts(limit);
		}

		const data = (await response.json()) as ApiProduct[];

		if (!Array.isArray(data)) {
			return getFallbackProducts(limit);
		}

		const mappedProducts = data.map(mapToPetProduct);

		return mappedProducts.length > 0
			? mappedProducts
			: getFallbackProducts(limit);
	} catch {
		return getFallbackProducts(limit);
	}
}

export function formatPrice(price: number): string {
	return new Intl.NumberFormat('es-MX', {
		style: 'currency',
		currency: 'MXN',
		maximumFractionDigits: 0,
	}).format(price * 18);
}

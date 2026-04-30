export type ShopProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const API_URL = "https://fakestoreapi.com/products";

export async function getProducts(limit?: number): Promise<ShopProduct[]> {
  const url = limit ? `${API_URL}?limit=${limit}` : API_URL;

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as ShopProduct[];

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(price * 18);
}

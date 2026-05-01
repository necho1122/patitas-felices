import { notFound } from 'next/navigation';
import { ShopPageContent } from '@/components/shop/shop-page-content';
import { getShopDictionary } from '@/lib/i18n/dictionaries';
import { resolveLang } from '@/lib/i18n/resolve-lang';
import type { RouteParamsInput } from '@/lib/i18n/types';
import { getProducts } from '@/lib/products';

export default async function ShopPageByLocale({
	params,
}: {
	params: RouteParamsInput;
}) {
	const lang = await resolveLang(params);

	if (!lang) {
		notFound();
	}

	const t = getShopDictionary(lang);
	const products = await getProducts();

	return (
		<ShopPageContent
			lang={lang}
			t={t}
			products={products}
		/>
	);
}

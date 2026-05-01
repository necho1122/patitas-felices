import { notFound } from 'next/navigation';
import { HomePageContent } from '@/components/home/home-page-content';
import { getHomeDictionary } from '@/lib/i18n/dictionaries';
import { resolveLang } from '@/lib/i18n/resolve-lang';
import type { RouteParamsInput } from '@/lib/i18n/types';
import { getProducts } from '@/lib/products';

export default async function HomePageByLocale({
	params,
}: {
	params: RouteParamsInput;
}) {
	const lang = await resolveLang(params);

	if (!lang) {
		notFound();
	}

	const t = getHomeDictionary(lang);
	const previewProducts = await getProducts(4);

	return (
		<HomePageContent
			lang={lang}
			t={t}
			previewProducts={previewProducts}
		/>
	);
}

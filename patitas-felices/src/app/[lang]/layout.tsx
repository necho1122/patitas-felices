import { notFound } from 'next/navigation';
import { HomeHeader } from '@/components/home/home-header';
import { LanguageProvider } from '@/components/i18n/language-context';
import { getHomeDictionary } from '@/lib/i18n/dictionaries';
import { resolveLang } from '@/lib/i18n/resolve-lang';
import { SUPPORTED_LANGS } from '@/lib/i18n/routing';
import type { RouteParamsInput } from '@/lib/i18n/types';

export const dynamicParams = false;

export function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: RouteParamsInput;
}) {
	const lang = await resolveLang(params);

	if (!lang) {
		notFound();
	}

	const t = getHomeDictionary(lang);

	return (
		<LanguageProvider lang={lang}>
			<HomeHeader
				lang={lang}
				t={t}
			/>
			{children}
		</LanguageProvider>
	);
}

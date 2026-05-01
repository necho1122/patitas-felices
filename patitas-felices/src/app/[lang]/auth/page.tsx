import { notFound } from 'next/navigation';
import { AuthPageContent } from '@/components/auth/auth-page-content';
import { resolveLang } from '@/lib/i18n/resolve-lang';
import type { RouteParamsInput } from '@/lib/i18n/types';

export default async function AuthPageByLocale({
	params,
}: {
	params: RouteParamsInput;
}) {
	const lang = await resolveLang(params);

	if (!lang) {
		notFound();
	}

	return <AuthPageContent lang={lang} />;
}

import { notFound } from 'next/navigation';
import { UserPanelPageContent } from '@/components/panel/user-panel-page-content';
import { getPanelDictionary } from '@/lib/i18n/dictionaries';
import { resolveLang } from '@/lib/i18n/resolve-lang';
import type { RouteParamsInput } from '@/lib/i18n/types';

export default async function UserPanelPageByLocale({
	params,
}: {
	params: RouteParamsInput;
}) {
	const lang = await resolveLang(params);

	if (!lang) {
		notFound();
	}

	const t = getPanelDictionary(lang);

	return (
		<UserPanelPageContent
			lang={lang}
			t={t}
		/>
	);
}

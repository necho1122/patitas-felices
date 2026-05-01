import { notFound } from 'next/navigation';
import { ProfilePageContent } from '@/components/profile/profile-page-content';
import { getProfileDictionary } from '@/lib/i18n/dictionaries';
import { resolveLang } from '@/lib/i18n/resolve-lang';
import type { RouteParamsInput } from '@/lib/i18n/types';

export default async function ProfilePageByLocale({
	params,
}: {
	params: RouteParamsInput;
}) {
	const lang = await resolveLang(params);

	if (!lang) {
		notFound();
	}

	const t = getProfileDictionary(lang);

	return (
		<ProfilePageContent
			lang={lang}
			t={t}
		/>
	);
}

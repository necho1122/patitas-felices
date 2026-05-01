'use client';

import Link from 'next/link';
import { useLanguage } from './language-context';
import type { Lang } from '@/lib/i18n/types';

type LanguageSwitcherClassNames = {
	container: string;
	label: string;
	link: string;
	activeLink: string;
};

export function LanguageSwitcher({
	label,
	routePath,
	options,
	classNames,
}: {
	label?: string;
	routePath: '/' | '/shop';
	options: Record<Lang, string>;
	classNames: LanguageSwitcherClassNames;
}) {
	const lang = useLanguage();

	const getHref = (optionLang: Lang): string => {
		if (routePath === '/') {
			return `/${optionLang}`;
		}

		return `/${optionLang}${routePath}`;
	};

	return (
		<div className={classNames.container}>
			{label && <span className={classNames.label}>{label}</span>}
			{(['en', 'es'] as const).map((optionLang) => (
				<Link
					key={optionLang}
					href={getHref(optionLang)}
					className={
						lang === optionLang ? classNames.activeLink : classNames.link
					}
				>
					{options[optionLang]}
				</Link>
			))}
		</div>
	);
}

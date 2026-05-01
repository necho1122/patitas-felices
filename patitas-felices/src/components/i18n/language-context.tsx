'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Lang } from '@/lib/i18n/types';

const LanguageContext = createContext<Lang>('en');

export function LanguageProvider({
	lang,
	children,
}: {
	lang: Lang;
	children: ReactNode;
}) {
	return (
		<LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
	);
}

export function useLanguage(): Lang {
	return useContext(LanguageContext);
}

import type { Lang } from './types';

export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'es'] as const;

export function isSupportedLang(value: string): value is Lang {
	return SUPPORTED_LANGS.includes(value as Lang);
}

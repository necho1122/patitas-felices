import type { Lang, RouteParamsInput } from './types';
import { isSupportedLang } from './routing';

export async function resolveLang(
	paramsInput: RouteParamsInput,
): Promise<Lang | null> {
	const params = paramsInput ? await paramsInput : undefined;
	const rawLang = params?.lang;

	if (!rawLang || !isSupportedLang(rawLang)) {
		return null;
	}

	return rawLang;
}

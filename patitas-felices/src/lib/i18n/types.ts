export type Lang = 'en' | 'es';

export type RouteParamsInput =
	| Promise<{ lang?: string }>
	| { lang?: string }
	| undefined;

import type { HomeDictionary } from '@/lib/i18n/dictionaries';
import type { Lang } from '@/lib/i18n/types';
import type { ShopProduct } from '@/lib/products';

export type HomeBaseProps = {
	lang: Lang;
	t: HomeDictionary;
};

export type HomeShopPreviewProps = HomeBaseProps & {
	previewProducts: ShopProduct[];
};

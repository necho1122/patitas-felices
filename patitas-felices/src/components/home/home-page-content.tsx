import styles from '@/app/page.module.css';
import { HomeContactSection } from './home-contact-section';
import { HomeHeroSection } from './home-hero-section';
import { HomeServicesSection } from './home-services-section';
import { HomeShopPreviewSection } from './home-shop-preview-section';
import type { HomeShopPreviewProps } from './home-types';

export function HomePageContent({
	lang,
	t,
	previewProducts,
}: HomeShopPreviewProps) {
	return (
		<div className={styles.page}>
			<main
				id='inicio'
				className={styles.main}
			>
				<HomeHeroSection
					lang={lang}
					t={t}
				/>
				<HomeServicesSection
					lang={lang}
					t={t}
				/>
				<HomeShopPreviewSection
					lang={lang}
					t={t}
					previewProducts={previewProducts}
				/>
				<HomeContactSection
					lang={lang}
					t={t}
				/>
			</main>
		</div>
	);
}

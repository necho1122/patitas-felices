import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/page.module.css';
import { formatPrice } from '@/lib/products';
import type { HomeShopPreviewProps } from './home-types';

export function HomeShopPreviewSection({
	lang,
	t,
	previewProducts,
}: HomeShopPreviewProps) {
	return (
		<section
			id='shop'
			className={styles.shop}
		>
			<div className={styles.shopIntro}>
				<div className={styles.sectionHead}>
					<p>{t.shop.kicker}</p>
					<h2>{t.shop.title}</h2>
					<p className={styles.shopLead}>{t.shop.lead}</p>
				</div>
				<Link
					href={`/${lang}/shop`}
					className={styles.shopCta}
				>
					{t.shop.cta}
				</Link>
			</div>

			<div className={styles.shopPreviewGrid}>
				{previewProducts.length === 0 ? (
					<p className={styles.shopFallback}>{t.shop.fallback}</p>
				) : (
					previewProducts.map((product) => (
						<article
							key={product.id}
							className={styles.shopProductCard}
						>
							<div className={styles.shopThumb}>
								<Image
									src={product.image}
									alt={product.title}
									width={260}
									height={190}
								/>
							</div>
							<h3>{product.title}</h3>
							<p>{formatPrice(product.price)}</p>
						</article>
					))
				)}
			</div>
		</section>
	);
}

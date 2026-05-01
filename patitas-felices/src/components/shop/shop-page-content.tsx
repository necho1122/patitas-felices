import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/shop/shop.module.css';
import { formatPrice, type ShopProduct } from '@/lib/products';
import type { Lang } from '@/lib/i18n/types';
import type { ShopDictionary } from '@/lib/i18n/dictionaries';

export function ShopPageContent({
	lang,
	t,
	products,
}: {
	lang: Lang;
	t: ShopDictionary;
	products: ShopProduct[];
}) {
	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<p className={styles.kicker}>{t.kicker}</p>
					<h1>{t.title}</h1>
					<p>{t.description}</p>
				</div>

				<div className={styles.actions}>
					<Link
						href={`/${lang}`}
						className={styles.backLink}
					>
						{t.back}
					</Link>
				</div>
			</header>

			<main>
				{products.length === 0 ? (
					<section className={styles.emptyState}>
						<h2>{t.emptyTitle}</h2>
						<p>{t.emptyText}</p>
					</section>
				) : (
					<section className={styles.grid}>
						{products.map((product) => (
							<article
								key={product.id}
								className={styles.card}
							>
								<div className={styles.thumb}>
									<Image
										src={product.image}
										alt={product.title}
										width={320}
										height={240}
									/>
								</div>
								<p className={styles.category}>{product.category}</p>
								<h2>{product.title}</h2>
								<p className={styles.description}>{product.description}</p>
								<div className={styles.footer}>
									<strong>{formatPrice(product.price)}</strong>
									<button type='button'>{t.add}</button>
								</div>
							</article>
						))}
					</section>
				)}
			</main>
		</div>
	);
}

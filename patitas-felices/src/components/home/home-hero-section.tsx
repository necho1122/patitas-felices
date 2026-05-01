import Image from 'next/image';
import styles from '@/app/page.module.css';
import type { HomeBaseProps } from './home-types';

export function HomeHeroSection({ t }: HomeBaseProps) {
	return (
		<section className={styles.hero}>
			<div className={styles.heroCopy}>
				<h1>
					<span>{t.hero.titleLine1}</span>
					<em>{t.hero.titleLine2}</em>
				</h1>
				<p>{t.hero.lead}</p>
			</div>

			<div className={styles.heroStage}>
				<span className={`${styles.decoBone} ${styles.boneTop}`} />
				<span className={`${styles.decoBone} ${styles.boneLeft}`} />
				<span className={`${styles.decoBone} ${styles.boneRight}`} />
				<span className={`${styles.decoPaw} ${styles.pawA}`}>🐾</span>
				<span className={`${styles.decoPaw} ${styles.pawB}`}>🐾</span>
				<span className={`${styles.decoPaw} ${styles.pawC}`}>🐾</span>

				<div className={styles.heroBlob} />

				<div className={styles.heroPetWrap}>
					<Image
						src='/your-groomer-day.webp'
						alt={t.hero.imageAlt}
						className={styles.heroPetImage}
						loading='eager'
						fill
						sizes='(max-width: 680px) 88vw, (max-width: 980px) 74vw, 530px'
					/>
				</div>

				<article className={`${styles.sideBadge} ${styles.badgeLeft}`}>
					<span>🧼</span>
					<p>{t.hero.badgeLeft}</p>
				</article>
				<article className={`${styles.sideBadge} ${styles.badgeRight}`}>
					<span>🚚</span>
					<p>{t.hero.badgeRight}</p>
				</article>
			</div>
		</section>
	);
}

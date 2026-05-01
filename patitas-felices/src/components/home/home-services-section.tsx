import styles from '@/app/page.module.css';
import type { HomeBaseProps } from './home-types';

export function HomeServicesSection({ t }: HomeBaseProps) {
	return (
		<section
			id='servicios'
			className={styles.section}
		>
			<div className={styles.sectionHead}>
				<p>{t.services.kicker}</p>
				<h2>{t.services.title}</h2>
			</div>
			<div className={styles.cardGrid}>
				{t.services.items.map((service) => (
					<article
						key={service.title}
						className={styles.card}
					>
						<h3>{service.title}</h3>
						<p>{service.text}</p>
					</article>
				))}
			</div>
		</section>
	);
}

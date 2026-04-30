import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { formatPrice, getProducts } from '@/lib/products';

const services = [
	{
		title: 'Spa Relajante',
		text: 'Bano, limpieza profunda, secado delicado y masaje suave para reducir estres.',
	},
	{
		title: 'Grooming Premium',
		text: 'Corte por raza, perfilado de patas y rostro, limpieza de oidos y corte de unas.',
	},
	{
		title: 'Plan Senior',
		text: 'Rutina especial para mascotas mayores con atencion paciente y productos hipoalergenicos.',
	},
];

export default async function Home() {
	const previewProducts = await getProducts(4);

	return (
		<div className={styles.page}>
			<header className={styles.topbar}>
				<a
					href='#inicio'
					className={styles.brand}
				>
					<Image
						src='/logo-patitas.webp'
						alt='Logo de Patitas Felices'
						className={styles.brandLogo}
						loading='eager'
						width={58}
						height={58}
					/>
					<span>
						<strong>Patitas Felices</strong>
						<small>Spa & Grooming</small>
					</span>
				</a>

				<nav className={styles.nav}>
					<a href='#servicios'>Servicios</a>
					<Link href='/shop'>Tienda</Link>
					<a href='#contacto'>Contacto</a>
				</nav>
			</header>

			<main
				id='inicio'
				className={styles.main}
			>
				<section className={styles.hero}>
					<div className={styles.heroCopy}>
						<p className={styles.kicker}>
							Bienestar integral para mascotas con cuidado boutique
						</p>
						<h1>Un spa sereno y feliz para su mejor version.</h1>
						<p>
							Creamos experiencias de cuidado que combinan higiene, confort y
							estilo, en sucursal o con nuestra van de servicio a domicilio.
						</p>
						<div className={styles.heroActions}>
							<a
								href='#contacto'
								className={styles.primaryBtn}
							>
								Reservar cita
							</a>
							<a
								href='/shop'
								className={styles.secondaryBtn}
							>
								Ver tienda
							</a>
						</div>
					</div>

					<div className={styles.heroVisual}>
						<div className={styles.bubbleOne} />
						<div className={styles.bubbleTwo} />

						<figure className={styles.vanSpotlight}>
							<div className={styles.vanSpotlightFrame}>
								<Image
									src='/van-patitas.webp'
									alt='Van de servicio a domicilio de Patitas Felices'
									className={styles.vanSpotlightImage}
									loading='eager'
									width={360}
									height={220}
								/>
							</div>
							<figcaption>Servicio a domicilio en toda la ciudad</figcaption>
						</figure>
					</div>
				</section>

				<section
					id='servicios'
					className={styles.section}
				>
					<div className={styles.sectionHead}>
						<p>Servicios principales</p>
						<h2>Rutinas de cuidado con foco en salud y estilo</h2>
					</div>
					<div className={styles.cardGrid}>
						{services.map((service) => (
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

				<section
					id='shop'
					className={styles.shop}
				>
					<div className={styles.shopIntro}>
						<div className={styles.sectionHead}>
						<p>Shop</p>
						<h2>Accesorios, ropa y juguetes para cada etapa de tu mascota</h2>
						<p className={styles.shopLead}>
							Explora una muestra rapida y entra a la tienda completa para ver
							todos los productos disponibles.
						</p>
						</div>
						<Link
							href='/shop'
							className={styles.shopCta}
						>
							Ir a tienda completa
						</Link>
					</div>

					<div className={styles.shopPreviewGrid}>
						{previewProducts.length === 0 ? (
							<p className={styles.shopFallback}>
								No pudimos cargar productos de muestra en este momento.
							</p>
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

				<section
					id='contacto'
					className={styles.contact}
				>
					<div>
						<p>Contacto</p>
						<h2>Agenda grooming o solicita visita de la van</h2>
						<p>
							WhatsApp: +52 55 0000 0000
							<br />
							Email: hola@patitasfelices.com
							<br />
							Horario: Lun a Sab, 9:00 - 19:00
						</p>
					</div>
					<form className={styles.form}>
						<label htmlFor='name'>Nombre</label>
						<input
							id='name'
							type='text'
							placeholder='Tu nombre'
						/>

						<label htmlFor='service'>Servicio</label>
						<select
							id='service'
							defaultValue=''
						>
							<option
								value=''
								disabled
							>
								Selecciona una opcion
							</option>
							<option value='spa'>Spa</option>
							<option value='grooming'>Grooming</option>
							<option value='domicilio'>Servicio a domicilio</option>
						</select>

						<label htmlFor='message'>Mensaje</label>
						<textarea
							id='message'
							rows={4}
							placeholder='Cuentanos sobre tu mascota'
						/>

						<button type='button'>Enviar solicitud</button>
					</form>
				</section>
			</main>
		</div>
	);
}

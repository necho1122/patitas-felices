'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './home-header.module.css';
import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import type { HomeBaseProps } from './home-types';

export function HomeHeader({ lang, t }: HomeBaseProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const closeMobile = () => setMobileOpen(false);
	const homeHref = `/${lang}`;
	const servicesHref = `/${lang}#servicios`;
	const blogHref = `/${lang}#blog`;
	const contactHref = `/${lang}#contacto`;
	const homeLabel = lang === 'es' ? 'Inicio' : 'Home';

	return (
		<header className={styles.header}>
			{/* ── Top bar ── */}
			<div className={styles.inner}>
				{/* Brand */}
				<Link
					href={homeHref}
					className={styles.brand}
					onClick={closeMobile}
				>
					<Image
						src='/logo-patitas.webp'
						alt={t.brandAlt}
						width={38}
						height={38}
						loading='eager'
						className={styles.brandLogo}
					/>
					<strong>Patitas Felices</strong>
				</Link>

				{/* Desktop nav */}
				<nav
					className={styles.nav}
					aria-label='Main navigation'
				>
					{/* Servicios — dropdown */}
					<div className={styles.dropdown}>
						<button
							className={styles.dropdownTrigger}
							aria-haspopup='true'
							tabIndex={0}
						>
							{t.nav.services}
							<span
								className={styles.dropdownArrow}
								aria-hidden='true'
							>
								▾
							</span>
						</button>
						<ul
							className={styles.dropdownMenu}
							role='menu'
						>
							{t.nav.servicesMenu.map((item) => (
								<li
									key={item}
									role='none'
								>
									<a
										href={servicesHref}
										className={styles.dropdownItem}
										role='menuitem'
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					<Link
						href={`/${lang}/shop`}
						className={styles.navLink}
					>
						{t.nav.shop}
					</Link>
					<a
						href={blogHref}
						className={styles.navLink}
					>
						{t.nav.blog}
					</a>
					<a
						href={contactHref}
						className={styles.navLink}
					>
						{t.nav.contact}
					</a>
				</nav>

				{/* Right actions: lang switcher + hamburger */}
				<div className={styles.actions}>
					<LanguageSwitcher
						routePath='/'
						options={{ en: t.language.en, es: t.language.es }}
						classNames={{
							container: styles.langSwitch,
							label: styles.langSwitchLabel,
							link: styles.langLink,
							activeLink: styles.activeLang,
						}}
					/>
					<button
						className={styles.hamburger}
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-expanded={mobileOpen}
						aria-controls='mobile-nav'
						aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
					>
						{mobileOpen ? '✕' : '☰'}
					</button>
				</div>
			</div>

			{/* ── Mobile panel ── */}
			{mobileOpen && (
				<nav
					id='mobile-nav'
					className={styles.mobilePanel}
					aria-label='Mobile navigation'
				>
					<Link
						href={homeHref}
						className={styles.mobileLink}
						onClick={closeMobile}
					>
						{homeLabel}
					</Link>

					<span className={styles.mobileServicesLabel}>{t.nav.services}</span>
					<ul className={styles.mobileServicesList}>
						{t.nav.servicesMenu.map((item) => (
							<li key={item}>
								<a
									href={servicesHref}
									className={styles.mobileServicesItem}
									onClick={closeMobile}
								>
									{item}
								</a>
							</li>
						))}
					</ul>

					<Link
						href={`/${lang}/shop`}
						className={styles.mobileLink}
						onClick={closeMobile}
					>
						{t.nav.shop}
					</Link>
					<a
						href={blogHref}
						className={styles.mobileLink}
						onClick={closeMobile}
					>
						{t.nav.blog}
					</a>
					<a
						href={contactHref}
						className={styles.mobileLink}
						onClick={closeMobile}
					>
						{t.nav.contact}
					</a>
				</nav>
			)}
		</header>
	);
}

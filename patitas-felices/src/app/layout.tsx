import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
	weight: ['400', '600', '700', '800'],
});

const baloo = Baloo_2({
	variable: '--font-baloo',
	subsets: ['latin'],
	weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
	title: 'Patitas Felices | Spa & Grooming',
	description:
		'Servicios de spa, grooming, tienda de accesorios y atencion a domicilio para mascotas.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${nunito.variable} ${baloo.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}

import styles from '@/app/page.module.css';
import type { HomeBaseProps } from './home-types';

export function HomeContactSection({ t }: HomeBaseProps) {
	return (
		<section
			id='contacto'
			className={styles.contact}
		>
			<div>
				<p>{t.contact.kicker}</p>
				<h2>{t.contact.title}</h2>
				<p>
					WhatsApp: +52 55 0000 0000
					<br />
					Email: hola@patitasfelices.com
					<br />
					{t.contact.scheduleLabel}: {t.contact.schedule}
				</p>
			</div>
			<form className={styles.form}>
				<label htmlFor='name'>{t.contact.name}</label>
				<input
					id='name'
					type='text'
					placeholder={t.contact.namePlaceholder}
				/>

				<label htmlFor='service'>{t.contact.service}</label>
				<select
					id='service'
					defaultValue=''
				>
					<option
						value=''
						disabled
					>
						{t.contact.selectOption}
					</option>
					<option value='spa'>Spa</option>
					<option value='grooming'>Grooming</option>
					<option value='domicilio'>{t.contact.atHome}</option>
				</select>

				<label htmlFor='message'>{t.contact.message}</label>
				<textarea
					id='message'
					rows={4}
					placeholder={t.contact.messagePlaceholder}
				/>

				<button type='button'>{t.contact.submit}</button>
			</form>
		</section>
	);
}

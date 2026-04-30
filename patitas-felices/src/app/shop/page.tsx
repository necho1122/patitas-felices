import Image from 'next/image';
import Link from 'next/link';
import styles from './shop.module.css';
import { formatPrice, getProducts } from '@/lib/products';

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Patitas Felices Shop</p>
          <h1>Tienda principal de productos para mascotas</h1>
          <p>
            Catalogo de prueba cargado desde API gratuita mientras integramos
            base de datos propia.
          </p>
        </div>
        <Link href='/' className={styles.backLink}>
          Volver al inicio
        </Link>
      </header>

      <main>
        {products.length === 0 ? (
          <section className={styles.emptyState}>
            <h2>No hay productos disponibles por ahora</h2>
            <p>Intenta de nuevo en unos minutos.</p>
          </section>
        ) : (
          <section className={styles.grid}>
            {products.map((product) => (
              <article key={product.id} className={styles.card}>
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
                  <button type='button'>Agregar</button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

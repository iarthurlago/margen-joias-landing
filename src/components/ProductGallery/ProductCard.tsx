import type { Product } from '../../types/product';
import { ContactLink } from '../ui/ContactLink';
import { ProductImage } from '../ui/ProductImage';
import styles from './ProductGallery.module.css';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={styles.card} aria-labelledby={`title-${product.id}`}>
      <div className={styles.imageFrame}><ProductImage product={product} /></div>
      <div className={styles.details}>
        <p className={styles.category}>{product.category}</p>
        <h3 id={`title-${product.id}`}>{product.name}</h3>
        {product.note && <p className={styles.note}>{product.note}</p>}
        <ContactLink href={product.consultationUrl} productId={product.id}
          placement="gallery" variant="text" label={`Consultar esta peça: ${product.name}`}>
          Consultar esta peça
        </ContactLink>
      </div>
    </article>
  );
}

import type { Product } from '../../types/product';
import styles from './ProductImage.module.css';

interface Props {
  product: Product;
  priority?: boolean;
  sizes?: string;
}

export function ProductImage({ product, priority = false, sizes = '(min-width: 72rem) 270px, (min-width: 40rem) 44vw, 88vw' }: Props) {
  const { image } = product;
  return (
    <img className={styles.image} src={image.src} srcSet={image.srcSet} sizes={sizes}
      alt={image.alt} width={image.width} height={image.height}
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
      decoding="async" />
  );
}

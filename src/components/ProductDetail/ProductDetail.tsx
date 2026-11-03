import type { Product } from '../../types/product';
import { descriptions, getProductGallery, getRecommendations } from '../../data/productDetails';
import { ProductCard } from '../ProductGallery/ProductCard';
import { ContactLink } from '../ui/ContactLink';
import { ProductGalleryViewer } from './ProductGalleryViewer';
import styles from './ProductDetail.module.css';

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className={`container ${styles.page}`}>
      <nav className={styles.breadcrumb} aria-label="Caminho de navegação">
        <a href="#inicio">Início</a><span aria-hidden="true">/</span><a href="#colecao">Nossa seleção</a>
        <span aria-hidden="true">/</span><span aria-current="page">{product.name}</span>
      </nav>
      <div className={styles.product}>
        <ProductGalleryViewer images={getProductGallery(product)} name={product.name} />
        <section className={styles.info} aria-labelledby="product-title">
          <p className="eyebrow">{product.category} · Margen Joias</p>
          <h1 id="product-title" tabIndex={-1}>{product.name}</h1>
          <p className={styles.description}>{descriptions[product.id]}</p>
          <p className={styles.price}>Valor e disponibilidade sob consulta</p>
          <ContactLink placement="gallery" productId={product.id} href={product.consultationUrl}
            label={`Consultar ${product.name} pelo WhatsApp`}>Consultar esta peça</ContactLink>
          <p className={styles.help}>Nossa equipe ajuda você a conhecer a peça, escolher o tamanho e encontrar o presente ideal.</p>
          <dl className={styles.specs}>
            <div><dt>Categoria</dt><dd>{product.category}</dd></div>
            <div><dt>Seleção</dt><dd>{product.id}</dd></div>
            <div><dt>Detalhes e medidas</dt><dd>Consulte nossa equipe</dd></div>
          </dl>
          {product.note && <p className={styles.help}>{product.note}</p>}
          <a className={styles.back} href="#colecao">← Voltar à seleção</a>
        </section>
      </div>
      <section className={styles.recommendations} aria-labelledby="recommendations-title">
        <p className="eyebrow">Outras escolhas para a sua história</p>
        <h2 id="recommendations-title">Você também pode gostar</h2>
        <div className={styles.recommendationGrid}>
          {getRecommendations(product).map(item => <ProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
}

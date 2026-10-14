import { featuredProducts, otherProducts } from '../../data/catalog';
import { ProductCard } from './ProductCard';
import styles from './ProductGallery.module.css';

export function ProductGallery() {
  return (
    <section className={`container ${styles.gallery}`} id="colecao" aria-labelledby="gallery-title">
      <div className={styles.heading}>
        <div><p className="eyebrow">Uma seleção com significado</p><h2 id="gallery-title">Peças que expressam<br />o seu <em>estilo.</em></h2></div>
        <p>Dos detalhes delicados às peças marcantes. Descubra o que combina com você e consulte a disponibilidade.</p>
      </div>
      <div className={styles.grid}>
        {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <div className={styles.moreHeading}><span aria-hidden="true">01 — 04</span><p>Para cada momento, uma nova escolha.</p></div>
      <h3 className={styles.subheading}>Outras formas de brilhar</h3>
      <div className={`${styles.grid} ${styles.secondaryGrid}`}>
        {otherProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <p className={styles.disclaimer}>As fotos apresentam peças e composições da loja. Consulte materiais, valores, medidas e disponibilidade pelo WhatsApp.</p>
    </section>
  );
}

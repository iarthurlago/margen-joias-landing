import { giftProduct } from '../../data/catalog';
import { ContactLink } from '../ui/ContactLink';
import { ProductImage } from '../ui/ProductImage';
import styles from './BrandStory.module.css';
import { productHref } from '../../data/productDetails';

export function BrandStory() {
  return (
    <section className={styles.section} id="historia" aria-labelledby="story-title">
      <div className={`container ${styles.inner}`}>
        <a className={styles.imageFrame} style={{ display: 'block' }} href={productHref(giftProduct)} aria-label={`Ver detalhes de ${giftProduct.name}`}>
          <ProductImage product={giftProduct} sizes="(min-width: 52rem) 380px, 88vw" />
        </a>
        <div className={styles.copy}>
          <p className="eyebrow">A Margen · Desde 2014</p>
          <h2 id="story-title">Um presente.<br />Infinitas <em>memórias.</em></h2>
          <p>Uma conquista, um novo começo, alguém especial. Cada escolha carrega um significado — e é um prazer fazer parte da sua.</p>
          <p>Desde 2014, a Margen Joias acompanha histórias em Aracaju, com uma seleção de joias e atendimento personalizado.</p>
          <ContactLink placement="story" variant="outline">Encontre um presente especial</ContactLink>
        </div>
      </div>
    </section>
  );
}

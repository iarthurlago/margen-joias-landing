import { heroProduct } from '../../data/catalog';
import { ContactLink } from '../ui/ContactLink';
import { ProductImage } from '../ui/ProductImage';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={`container ${styles.hero}`} id="inicio" aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className="eyebrow">Margen Joias · Aracaju, SE</p>
        <h1 id="hero-title">Joias para<br />celebrar a sua <em>história.</em></h1>
        <p className={styles.description}>Há momentos que merecem ficar por perto. Encontre uma peça para presentear, celebrar ou simplesmente ser você.</p>
        <div className={styles.actions}>
          <a className={styles.explore} href="#colecao">Explore nossa seleção <span aria-hidden="true">↓</span></a>
          <ContactLink placement="hero" variant="text">Fale com a Margen</ContactLink>
        </div>
        <p className={styles.signature}>Ouro, prata, semijoias e relógios.<br />Um olhar especial para cada escolha.</p>
      </div>
      <figure className={styles.figure}>
        <div className={styles.imageFrame}>
          <ProductImage product={heroProduct} priority sizes="(min-width: 72rem) 440px, (min-width: 52rem) 42vw, 88vw" />
        </div>
        <figcaption><span>Em destaque</span><span>Colar pantera com elos portugueses</span></figcaption>
      </figure>
    </section>
  );
}

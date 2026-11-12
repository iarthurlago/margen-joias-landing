import { site } from '../../data/site';
import styles from './CustomerReviews.module.css';

// Trechos conferidos na ficha pública da Margen no Google Maps em 12/11/2026.
const reviews = [
  { author: 'julianna carvalho', quote: 'Além das peças serem lindas, o atendimento é maravilhoso, super recomendo!!!' },
  { author: 'Jonathan Levi', quote: 'Atendimento diferenciado. Ouro de qualidade e confiança!' },
  { author: 'Andreza Coutinho', quote: 'Atendimento maravilhoso' },
] as const;

export function CustomerReviews() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="reviews-title">
      <div className={styles.heading}>
        <p className="eyebrow">Experiências de quem nos visita</p>
        <h2 id="reviews-title">O que dizem sobre a Margen</h2>
      </div>
      <div className={styles.grid}>
        {reviews.map(({ author, quote }) => (
          <figure className={styles.review} key={author}>
            <p className={styles.stars} aria-label="5 de 5 estrelas">★★★★★</p>
            <blockquote><p>“{quote}”</p></blockquote>
            <figcaption>{author}<span> · Avaliação no Google</span></figcaption>
          </figure>
        ))}
      </div>
      <a className={styles.source} href={site.maps} target="_blank" rel="noopener noreferrer">
        Ver avaliações no Google <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span>
      </a>
    </section>
  );
}

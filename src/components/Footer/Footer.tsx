import { site } from '../../data/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>MARGEN <span>JOIAS</span></p>
        <p>Desde {site.since} · Aracaju, Sergipe</p>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">@margenjoias <span aria-hidden="true">↗</span><span className="sr-only"> no Instagram (abre em nova aba)</span></a>
      </div>
    </footer>
  );
}

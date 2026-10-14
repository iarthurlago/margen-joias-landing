import { ContactLink } from '../ui/ContactLink';
import styles from './Header.module.css';

export function Header() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className={styles.announcement}>Desde 2014, fazendo parte da sua história.</div>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <a className={styles.brand} href="#inicio" aria-label="Margen Joias — início">
            MARGEN<span>JOIAS</span>
          </a>
          <nav className={styles.nav} aria-label="Navegação principal">
            <a href="#colecao">Nossa seleção</a>
            <a href="#historia">A Margen</a>
            <a href="#visite">Visite a loja</a>
          </nav>
          <div className={styles.contact}>
            <ContactLink placement="header" variant="outline">Fale com a Margen</ContactLink>
          </div>
        </div>
      </header>
    </>
  );
}

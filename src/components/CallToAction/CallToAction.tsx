import { site } from '../../data/site';
import { ContactLink } from '../ui/ContactLink';
import styles from './CallToAction.module.css';

export function CallToAction() {
  return (
    <section className={`container ${styles.section}`} id="visite" aria-labelledby="contact-title">
      <div className={styles.copy}>
        <p className="eyebrow">Vamos encontrar a sua próxima joia?</p>
        <h2 id="contact-title">Sua história merece<br />esse <em>encontro.</em></h2>
        <p>Converse com a nossa equipe ou venha conhecer as peças de perto. Será um prazer receber você.</p>
        <ContactLink placement="contact">Fale conosco pelo WhatsApp</ContactLink>
      </div>
      <div className={styles.visit}>
        <p className="eyebrow">Visite a Margen</p>
        <h3>{site.address.gallery}</h3>
        <address>{site.address.street}<br />{site.address.locality}<br />{site.address.postalCode}</address>
        <a className={styles.mapLink} href={site.maps} target="_blank" rel="noopener noreferrer">
          Como chegar <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span>
        </a>
        <div className={styles.phone}><span>Atendimento personalizado</span><a href={site.telephoneUrl}>{site.phone}</a></div>
        <dl className={styles.schedule} aria-label="Horários de atendimento">
          {site.hours.map(({ days, time }) => (
            <div key={days}><dt>{days}</dt><dd>{time}</dd></div>
          ))}
        </dl>
        <p className={styles.hours}>Horários informados em 11/09/2026. Confirme antes da visita.</p>
      </div>
    </section>
  );
}

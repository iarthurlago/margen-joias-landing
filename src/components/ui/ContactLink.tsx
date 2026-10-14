import type { ReactNode } from 'react';
import { site } from '../../data/site';
import { trackConversion, type ConversionInput } from '../../services/conversion';
import styles from './ContactLink.module.css';

interface Props extends ConversionInput {
  children: ReactNode;
  href?: string;
  variant?: 'solid' | 'outline' | 'text';
  label?: string;
}

export function ContactLink({
  children, placement, productId, href = site.whatsapp, variant = 'solid', label,
}: Props) {
  function handleClick() {
    // O link nativo funciona mesmo sem JS; a futura telemetria não bloqueia a consulta.
    void trackConversion({ placement, productId }).catch(() => {
      // Uma falha de telemetria não deve interromper a navegação ao WhatsApp.
    });
  }

  return (
    <a className={styles[variant]} href={href} target="_blank" rel="noopener noreferrer"
      aria-label={label ? `${label} (abre em nova aba)` : undefined} onClick={handleClick}>
      {children}<span aria-hidden="true">↗</span>
      {!label && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

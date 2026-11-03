import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { GalleryImage } from '../../data/productDetails';
import { assetSrcSet, assetUrl } from '../../utils/assets';
import styles from './ProductDetail.module.css';

export function ProductGalleryViewer({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const image = images[active];
  const multiple = images.length > 1;
  function move(offset: number) { setActive(index => (index + offset + images.length) % images.length); }
  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }
  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const controls = (inDialog = false) => multiple && (
    <div className={styles.controls}>
      <button type="button" aria-label="Foto anterior" onClick={() => move(-1)}>←</button>
      <span role="status" aria-live="polite" aria-atomic="true">
        {active + 1} / {images.length}<span className="sr-only"> — {image.alt}</span>
      </span>
      <button type="button" aria-label="Próxima foto" onClick={() => move(1)}>→</button>
      {inDialog && <span className="sr-only">Use as setas do teclado para navegar.</span>}
    </div>
  );
  return (
    <section className={styles.gallery} aria-label={`Fotos de ${name}`} onKeyDown={onKeyDown}>
      <button className={styles.mainImage} type="button" aria-label={`Ampliar foto de ${name}`}
        aria-haspopup="dialog" onClick={() => setExpanded(true)}>
        <img src={assetUrl(image.src)} srcSet={assetSrcSet(image.srcSet)} sizes="(min-width: 52rem) 55vw, 100vw"
          alt={image.alt} width={image.width} height={image.height} decoding="async" />
        <span className={styles.zoomHint} aria-hidden="true">⤢ Ampliar</span>
      </button>
      {controls()}
      {multiple && <div className={styles.thumbnails} role="group" aria-label="Selecionar foto">
        {images.map((photo, index) => (
          <button key={photo.src} type="button" aria-label={`Ver foto ${index + 1} de ${images.length}`}
            aria-pressed={index === active} onClick={() => setActive(index)}>
            <img src={assetUrl(photo.src)} srcSet={assetSrcSet(photo.srcSet)} sizes="90px" alt="" width={photo.width} height={photo.height} loading="lazy" />
          </button>
        ))}
      </div>}
      {!multiple && <p className={styles.singleImage}>Imagem disponível desta seleção.</p>}
      <dialog ref={dialog} className={styles.lightbox} aria-label={`Visualização ampliada de ${name}`}
        onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)}>
        {expanded && <>
          <div className={styles.lightboxHeader}><p>{name}</p>
            <button type="button" autoFocus aria-label="Fechar visualização ampliada" onClick={() => setExpanded(false)}>Fechar ×</button>
          </div>
          <img className={styles.enlarged} src={assetUrl(image.src)} srcSet={assetSrcSet(image.srcSet)} sizes="90vw" alt={image.alt} width={image.width} height={image.height} />
          {controls(true)}
        </>}
      </dialog>
    </section>
  );
}

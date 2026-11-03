import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { BrandStory } from './components/BrandStory/BrandStory';
import { CallToAction } from './components/CallToAction/CallToAction';
import { Footer } from './components/Footer/Footer';
import { useEffect, useSyncExternalStore } from 'react';
import { products } from './data/catalog';
import { ProductDetail } from './components/ProductDetail/ProductDetail';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}
const readHash = () => window.location.hash;
const serverHash = () => '';

export default function App() {
  // URLs com fragmento funcionam em hospedagem estática e preservam voltar/avançar.
  const hash = useSyncExternalStore(subscribe, readHash, serverHash);
  const product = products.find(item => hash === `#produto/${item.id.toLowerCase()}`);
  const unknownProduct = hash.startsWith('#produto/') && !product;
  useEffect(() => {
    document.title = product ? `${product.name} | Margen Joias` : 'Margen Joias | Joias para celebrar a sua história';
    if (product || unknownProduct) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('product-title')?.focus({ preventScroll: true });
    } else if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [hash, product, unknownProduct]);
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        {product ? <ProductDetail key={product.id} product={product} /> : unknownProduct ? (
          <section className="container" style={{ paddingBlock: 64 }}>
            <h1 id="product-title" tabIndex={-1}>Peça não encontrada</h1>
            <p><a href="#colecao">Voltar à nossa seleção</a></p>
          </section>
        ) : <>
        <Hero />
        <ProductGallery />
        <BrandStory />
        <CallToAction />
        </>}
      </main>
      <Footer />
    </>
  );
}

import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { BrandStory } from './components/BrandStory/BrandStory';
import { CallToAction } from './components/CallToAction/CallToAction';
import { Footer } from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <ProductGallery />
        <BrandStory />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

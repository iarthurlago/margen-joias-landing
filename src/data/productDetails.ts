import additional from './product-galleries.generated.json';
import studio from './studio-galleries.generated.json';
import { products } from './catalog';
import type { Product } from '../types/product';

export type GalleryImage = Product['image'];
const additionalImages: Record<string, GalleryImage[]> = additional;
const studioImages: Record<string, Omit<GalleryImage, 'alt'>> = studio;

export function productHref(product: Product) {
  return `#produto/${product.id.toLowerCase()}`;
}

export function getProductGallery(product: Product): GalleryImage[] {
  const alternate = studioImages[product.id];
  return [
    { ...product.image, alt: `${product.name} — vista principal` },
    ...(alternate ? [{ ...alternate, alt: `${product.name} — outra composição` }] : []),
    ...(additionalImages[product.id] ?? []),
  ];
}

export function getRecommendations(product: Product) {
  const others = products.filter(item => item.id !== product.id);
  return [
    ...others.filter(item => item.category === product.category),
    ...others.filter(item => item.category !== product.category),
  ].slice(0, 4);
}

export const descriptions: Record<string, string> = {
  'MJ-01': 'Dois colares, dois detalhes cheios de significado. Uma seleção de pingentes afetivos para levar uma lembrança especial sempre por perto.',
  'MJ-02': 'Colar e brincos com pedras em tons vinho, fumê e amarelo. Uma composição de formas e cores para acompanhar momentos especiais.',
  'MJ-03': 'Arcos, correntes delicadas e movimento. Brincos alongados em ouro 18k, conforme a descrição da loja, com detalhes que iluminam a composição.',
  'MJ-04': 'A presença da pantera encontra a delicadeza dos elos portugueses. Uma peça marcante, com detalhes claros e dourados que convidam a olhar de perto.',
  'MJ-05': 'Um símbolo para carregar com você. Pulseira em ouro 18k, conforme a descrição da loja, com elos redondos e pingente Fé.',
  'MJ-06': 'Uma corrente delicada, uma medalha circular e pequenos símbolos. Detalhes que dão significado à sua escolha.',
  'MJ-07': 'O verde das esmeraldas em uma composição delicada. Conheça os detalhes da pulseira e converse com a equipe sobre suas características.',
  'MJ-08': 'Uma seleção de colares com diferentes pingentes. Consulte os materiais e as características de cada peça com nossa equipe.',
  'MJ-09': 'Relógios Champion em diferentes acabamentos. Converse com a equipe para conhecer os modelos e suas especificações.',
  'MJ-10': 'Formas, cores e combinações de anéis para inspirar sua escolha. Esta imagem é uma referência de coleção; consulte os modelos disponíveis.',
};

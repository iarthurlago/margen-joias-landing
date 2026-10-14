import catalog from './products.generated.json';
import type { Product } from '../types/product';

export const products: readonly Product[] = catalog;

function getProduct(id: string): Product {
  const product = products.find((item) => item.id === id);
  if (!product) throw new Error(`Peça ausente no catálogo: ${id}`);
  return product;
}

export const heroProduct = getProduct('MJ-04');
export const giftProduct = getProduct('MJ-01');
export const featuredProducts = ['MJ-05', 'MJ-07', 'MJ-06', 'MJ-04'].map(getProduct);
export const otherProducts = ['MJ-03', 'MJ-02', 'MJ-08', 'MJ-09', 'MJ-10'].map(getProduct);

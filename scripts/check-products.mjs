import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { products } = await server.ssrLoadModule('/src/data/catalog.ts');
  const { getProductGallery, getRecommendations, productHref } = await server.ssrLoadModule('/src/data/productDetails.ts');
  const { ProductDetail } = await server.ssrLoadModule('/src/components/ProductDetail/ProductDetail.tsx');
  const expectedPhotos = [2, 2, 5, 3, 2, 2, 2, 1, 1, 1];
  for (const [index, product] of products.entries()) {
    const photos = getProductGallery(product);
    assert.equal(photos.length, expectedPhotos[index], `Fotos de ${product.id}`);
    assert.equal(photos[0].src, product.image.src, 'A foto principal deve ser preservada.');
    assert.equal(new Set(photos.map(photo => photo.src)).size, photos.length);
    for (const photo of photos) {
      assert.ok(photo.alt && photo.width > 0 && photo.height > 0);
      // Toda variante utilizada deve estar disponível no build publicável.
      for (const entry of photo.srcSet.split(', ')) {
        await access(new URL(`../dist${entry.split(' ')[0]}`, import.meta.url));
      }
    }
    const recommendations = getRecommendations(product);
    assert.equal(recommendations.length, 4);
    assert.equal(new Set(recommendations.map(item => item.id)).size, 4);
    assert.ok(recommendations.every(item => item.id !== product.id));
    const html = renderToStaticMarkup(createElement(ProductDetail, { product }));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(html.includes('Você também pode gostar'));
    assert.ok(html.includes('aria-haspopup="dialog"'));
    assert.equal(html.includes('aria-label="Próxima foto"'), photos.length > 1);
    for (const item of recommendations) assert.ok(html.includes(`href="${productHref(item)}"`));
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'IDs únicos na página de detalhes.');
  }
  console.log('OK: 10 páginas de produto, fotos e variantes locais, controles e recomendações.');
} finally {
  await server.close();
}

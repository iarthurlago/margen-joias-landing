import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const root = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const products = JSON.parse(await readFile(new URL('../src/data/products.generated.json', import.meta.url), 'utf8'));
const basePath = process.env.VITE_BASE_PATH || '/';

assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'A página deve ter um título principal.');
assert.ok(html.includes('id="conteudo"') && html.includes('id="colecao"'), 'Conteúdo deve existir no HTML estático.');
assert.ok(!html.includes('<!--app-html-->'), 'Pré-renderização deve substituir o marcador.');
assert.equal(products.length, 10, 'As dez fotos do catálogo devem ser integradas.');
for (const product of products) {
  assert.ok(html.includes(`${basePath}${product.image.src.slice(1)}`), `Foto ausente no HTML: ${product.id}`);
  assert.ok(product.image.alt.length > 0, `Texto alternativo ausente: ${product.id}`);
  assert.equal(new URL(product.consultationUrl).hostname, 'wa.me');
  for (const entry of product.image.srcSet.split(', ')) {
    await access(new URL(entry.split(' ')[0].replace(/^\//, ''), root));
  }
}
for (const product of products.slice(7)) {
  const message = new URL(product.consultationUrl).searchParams.get('text');
  assert.ok(message?.includes(product.id), `Código ausente na consulta: ${product.id}`);
  assert.ok(!message.includes('google.com/maps'), `URL extensa na consulta: ${product.id}`);
}
for (const author of ['julianna carvalho', 'Jonathan Levi', 'Andreza Coutinho']) {
  assert.ok(html.includes(author), `Avaliação ausente: ${author}`);
}
assert.ok(!html.includes('Horários informados em'), 'Aviso de data antigo no HTML.');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Os IDs devem ser únicos.');
const productRoutes = products.map(product => `produto/${product.id.toLowerCase()}`);
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(match[1]) || productRoutes.includes(match[1]), `Destino ausente: ${match[1]}`);
}
for (const route of productRoutes) assert.ok(html.includes(`href="#${route}"`), `Produto sem link: ${route}`);
for (const match of html.matchAll(/(?:src|href)="([^\"]+\/assets\/[^\"]+)"/g)) {
  const relativePath = match[1].replace(basePath, '');
  await access(new URL(relativePath, root));
}
assert.ok(html.includes(`${basePath}favicon.svg`), 'O favicon deve respeitar o caminho base.');
console.log('OK: HTML estático, 10 fotos, variantes, assets, links WhatsApp e âncoras.');

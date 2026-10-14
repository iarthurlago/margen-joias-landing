import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = path.join(root, 'conteudo-landing');
const outputDirectory = path.join(root, 'public', 'images');
const catalog = JSON.parse((await readFile(path.join(sourceDirectory, 'catalogo.json'), 'utf8')).replace(/^\uFEFF/, ''));
await mkdir(outputDirectory, { recursive: true });
await mkdir(path.join(root, 'src', 'data'), { recursive: true });

const products = [];
let totalBytes = 0;

// Processamento sequencial entre originais mantém o uso de memória previsível.
for (const product of catalog.produtos) {
  const original = path.join(sourceDirectory, product.imagem.arquivo);
  const metadata = await sharp(original).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Dimensões ausentes: ${original}`);
  const maxWidth = Math.min(metadata.width, 1080);
  const widths = [...new Set([360, 720, maxWidth].filter((width) => width <= maxWidth))].sort((a, b) => a - b);
  const versions = [];

  for (const width of widths) {
    const filename = `${product.id.toLowerCase()}-${width}.webp`;
    // Apenas redimensiona e comprime. Preserva o enquadramento e os originais.
    const info = await sharp(original)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(path.join(outputDirectory, filename));
    totalBytes += info.size;
    versions.push({ width: info.width, src: `/images/${filename}` });
  }

  const fallback = versions.find((version) => version.width >= 720) ?? versions.at(-1);
  products.push({
    id: product.id,
    name: product.nome_editorial,
    category: product.categoria,
    consultationUrl: product.cta.url,
    note: product.id === 'MJ-10' ? 'Referência de coleção. Consulte os modelos disponíveis.' : '',
    image: {
      src: fallback.src,
      srcSet: versions.map((version) => `${version.src} ${version.width}w`).join(', '),
      alt: product.imagem.alt,
      width: metadata.width,
      height: metadata.height,
    },
  });
}

await writeFile(path.join(root, 'src', 'data', 'products.generated.json'), `${JSON.stringify(products, null, 2)}\n`);
console.log(`${products.length} fotos preparadas: ${(totalBytes / 1024).toFixed(0)} KiB somando todas as variantes.`);

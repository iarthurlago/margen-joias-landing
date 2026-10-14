import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'conteudo-landing');
const manifestPath = path.join(source, 'imagens-adicionais.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const catalog = JSON.parse((await readFile(path.join(source, 'catalogo.json'), 'utf8')).replace(/^\uFEFF/, ''));
const knownIds = new Set(catalog.produtos.map(p => p.id));
const hashes = new Set(catalog.produtos.map(p => p.imagem.sha256));
const galleries = {};
const output = path.join(root, 'public/images/adicionais');
await mkdir(output, { recursive: true });

for (const item of manifest.imagens) {
  if (!knownIds.has(item.produto_id)) throw new Error(`Produto desconhecido: ${item.produto_id}`);
  const original = path.join(source, item.arquivo);
  const bytes = await readFile(original);
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (hash !== item.sha256 || hashes.has(hash)) throw new Error(`Arquivo alterado ou repetido: ${item.id}`);
  hashes.add(hash);
  const meta = await sharp(bytes).metadata();
  const widths = [...new Set([360, 720, Math.min(1080, meta.width)].filter(w => w <= meta.width))].sort((a,b) => a-b);
  const versions = [];
  for (const width of widths) {
    const filename = `${item.id.toLowerCase()}-${width}.webp`;
    const info = await sharp(bytes).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toFile(path.join(output, filename));
    versions.push({ src: `/images/adicionais/${filename}`, width: info.width, bytes: info.size });
  }
  const fallback = versions.find(v => v.width >= 720) ?? versions.at(-1);
  (galleries[item.produto_id] ??= []).push({
    id: item.id,
    src: fallback.src,
    srcSet: versions.map(v => `${v.src} ${v.width}w`).join(', '),
    alt: item.alt,
    width: meta.width,
    height: meta.height,
    sourceUrl: item.fonte.url,
    sourceAiLabel: item.fonte.rotulo_ia,
    usage: item.uso_sugerido,
    priority: item.prioridade,
  });
}
for (const images of Object.values(galleries)) images.sort((a,b) => a.priority-b.priority);
await writeFile(path.join(root, 'src/data/product-galleries.generated.json'), JSON.stringify(galleries, null, 2) + '\n');
console.log(`${manifest.imagens.length} imagens adicionais verificadas e preparadas para ${Object.keys(galleries).length} produtos.`);

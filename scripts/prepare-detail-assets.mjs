import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// IDs explícitos: as variações de anéis extras não pertencem aos itens do catálogo.
const sources = {
  'MJ-01': 'studio-branco-outras-joias/mj-01-v2-branco.png',
  'MJ-02': 'studio-branco-outras-joias/mj-02-v2-branco.png',
  'MJ-03': 'studio-branco/mj-03-v2-diagonal-branco.png',
  'MJ-04': 'studio-branco/mj-04-v2-macro-pantera-branco.png',
  'MJ-05': 'studio-branco-outras-joias/mj-05-v2-r2-branco.png',
  'MJ-06': 'studio-branco-outras-joias/mj-06-v2-branco.png',
  'MJ-07': 'studio-branco-outras-joias/mj-07-v2-branco.png',
};
const root = new URL('../', import.meta.url);
const output = new URL('public/images/detalhes/', root);
await mkdir(output, { recursive: true });
const galleries = {};
for (const [id, source] of Object.entries(sources)) {
  const bytes = await readFile(new URL(`conteudo-landing/${source}`, root));
  const { width, height } = await sharp(bytes).metadata();
  const sizes = [360, 720, Math.min(width, 1080)];
  for (const size of sizes) {
    await sharp(bytes).resize({ width: size, withoutEnlargement: true }).webp({ quality: 85 })
      .toFile(fileURLToPath(new URL(`${id.toLowerCase()}-v2-${size}.webp`, output)));
  }
  galleries[id] = {
    src: `/images/detalhes/${id.toLowerCase()}-v2-720.webp`,
    srcSet: sizes.map(size => `/images/detalhes/${id.toLowerCase()}-v2-${size}.webp ${size}w`).join(', '),
    width, height,
  };
}
await writeFile(new URL('src/data/studio-galleries.generated.json', root), JSON.stringify(galleries, null, 2) + '\n');
console.log('Variações de sete produtos preparadas para a galeria.');

import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../.prerender/entry-server.js';

const file = new URL('../dist/index.html', import.meta.url);
const template = await readFile(file, 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('Marcador de pré-renderização não encontrado.');

// Executa React somente durante o build; a hospedagem serve arquivos estáticos.
await writeFile(file, template.replace('<!--app-html-->', render()));
console.log('HTML estático gerado em dist/index.html.');

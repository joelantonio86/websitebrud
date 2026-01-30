/**
 * Copia dist/index.html para dist/404.html.
 * No GitHub Pages, ao acessar uma rota do SPA (ex: /partituras), o servidor
 * retorna 404 e serve 404.html — assim o React carrega e o Router resolve a URL.
 */
import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

if (!existsSync(indexPath)) {
  console.error('scripts/copy-404.js: dist/index.html não encontrado. Rode "npm run build" antes.');
  process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log('dist/404.html criado (SPA fallback para GitHub Pages).');

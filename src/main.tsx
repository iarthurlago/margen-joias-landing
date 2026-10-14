import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento #root não encontrado.');
const app = <StrictMode><App /></StrictMode>;

// Em produção, conecta as interações ao HTML já gerado durante o build.
if (container.hasChildNodes() && container.querySelector('main')) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

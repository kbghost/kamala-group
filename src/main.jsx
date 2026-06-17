import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

// Note: StrictMode volontairement retiré — son double-montage en mode dev
// casse l'autoplay de Swiper (timer créé puis détruit/recréé en rafale,
// ce qui provoquait le défilement qui s'arrêtait après une seule rotation).
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

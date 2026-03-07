import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ─── Mount React app to the #root div in index.html ──────────────────────────
const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

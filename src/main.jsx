import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { loadContent } from './lib/content.js';
import './styles.css';
import './theme.css';

// Load saved content first so the first render already shows the latest text and images.
loadContent().finally(() => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});

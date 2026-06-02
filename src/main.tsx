import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { storageUrl } from './utils/storage';
import { configurationService } from './services/configurationService';
import './index.css';

// Set favicon from backend config
configurationService.getAll()
  .then(config => {
    if (config.logo) {
      const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (link) {
        link.href = storageUrl(config.logo);
      }
    }
  })
  .catch(() => {});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const rootElement = document.createElement('div');
rootElement.id = 'root';

document.body.appendChild(rootElement);
document.body.style.overflow = 'hidden';

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

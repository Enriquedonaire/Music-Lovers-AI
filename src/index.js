import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Obtén el contenedor raíz donde montaremos la aplicación
const container = document.getElementById('root');

// Crea la raíz y monta la aplicación
const root = createRoot(container);

root.render(
  <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
    <App />
  </BrowserRouter>
);

reportWebVitals();

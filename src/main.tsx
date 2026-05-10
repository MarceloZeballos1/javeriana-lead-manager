import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LeadProvider } from './context/LeadContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LeadProvider>
      <App />
    </LeadProvider>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress ResizeObserver errors in development
const resizeObserverError = window.console.error;
window.console.error = (...args) => {
  if (
    args[0]?.includes?.('ResizeObserver loop') ||
    args[0]?.message?.includes?.('ResizeObserver loop')
  ) {
    return;
  }
  resizeObserverError(...args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
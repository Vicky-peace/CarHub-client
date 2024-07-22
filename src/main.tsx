import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { store } from './store.ts'; 
import App from './App.tsx'; 

// Render your application with Redux Provider
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

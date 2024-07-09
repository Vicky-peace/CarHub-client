import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import { store } from './store.ts'; 
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> Wrap your App with the Redux Provider
      <App />
    </Provider>
  </React.StrictMode>
);

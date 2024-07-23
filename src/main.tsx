import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change in import
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from './store.ts'; // Ensure your Redux store is correctly imported
import App from './App.tsx'; // Adjust path based on your application structure

// Create a custom theme
const theme = extendTheme({
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
  },
  fonts: {
    body: 'Roboto, sans-serif',
  },
});

// Create a root and render your application with ChakraProvider and Redux Provider
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

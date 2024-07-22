import React from 'react';
import ReactDOM from 'react-dom';
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

// Render your application with ChakraProvider and Redux Provider
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

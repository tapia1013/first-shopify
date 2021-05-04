import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShopProvider from './context/shopContext';

ReactDOM.render(
  <ShopProvider>
    <App />
  </ShopProvider>,
  document.getElementById('root')
);

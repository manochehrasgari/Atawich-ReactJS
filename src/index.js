import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import App from './App';
import AuthProvider from './context/auth/authContext'
import CartContextProvider from './context/cart/cartContext';
import ProductsContextProvider from './context/product/productContext';


ReactDOM.render(
  <BrowserRouter>
    <ProductsContextProvider>
      <CartContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CartContextProvider>
    </ProductsContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
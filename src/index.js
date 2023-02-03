import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from 'routes';
import './index.css';
import store from './store/store'
import { Provider } from 'react-redux'
import { createStandaloneToast } from '@chakra-ui/toast'

const {ToastContainer, toast} = createStandaloneToast()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
 //</React.StrictMode>
);

toast({
  description: 'Está funcionando',
  duration: 2000
})
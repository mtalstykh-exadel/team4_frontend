// import React, { useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import './styles/normalize.css';
import './index.scss';

import reportWebVitals from './reportWebVitals';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { defineLang } from './utils/lang-service.js';

import store from './store/store';

const AppContainer = () => {

  defineLang();
  return <BrowserRouter>
    <Provider store={store}>
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    </Provider>
  </BrowserRouter>;
};

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
reportWebVitals();

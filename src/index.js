import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import 'normalize.css';
import reportWebVitals from './reportWebVitals';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { defineLang } from './utils/lang-service.js';

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

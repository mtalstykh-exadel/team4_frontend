import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import './index.scss';
import 'normalize.css';

import reportWebVitals from './reportWebVitals';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

import { defineLang } from './utils/lang-service.js';

import store from './store/store';

import { fetchLogout } from './store/actions/logoutActions';
import { calculateRemainingTime } from './utils/token-expire';

const AppContainer = () => {
  const state = store.getState();

  if (state.auth.isAuth) {
    useEffect(() => setTimeout(() => store.dispatch(fetchLogout()), calculateRemainingTime()));
  }

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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Lang } from './utils/lang-service.js';
const ln = new Lang();
const AppContainer = () => {
  ln.get();
  
  return <BrowserRouter>
    <Provider store={store}>
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    </Provider>
  </BrowserRouter>;
};

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

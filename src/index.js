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
import jwt from './utils/jwt-parser.js';
import Lang from './utils/lang-service.js';

const AppContainer = () => {
  Lang.get(jwt.parse(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjY2Nzk2ODQsImV4cCI6MTY1ODIxNTY4NCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoiTWFuYWdlciIsImxhbmciOiJydSJ9.0M0nKXvGBdJgA13XQYGMX-jk3jcVDWBc9iwO_uy2sE0"
  ));
  
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

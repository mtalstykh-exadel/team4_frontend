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
import catalogEn from '@lingui/loader!./locales/en/messages.po';
import catalogRu from '@lingui/loader!./locales/ru/messages.po';
i18n.load('en', catalogEn.messages);
i18n.load('ru', catalogRu.messages);
i18n.activate('en');

const AppContainer = () => {
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

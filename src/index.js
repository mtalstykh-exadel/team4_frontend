import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

//for Internationalization
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
//Start on eng
import catalogEn from './locales/en/messages.js';
i18n.load('en', catalogEn.messages);
i18n.activate('en');
//start on ru
// import catalogRu from './locales/ru/messages.js';
// i18n.load('ru', catalogRu.messages);
// i18n.activate('ru');

ReactDOM.render(
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>,
  document.getElementById('root')
);
reportWebVitals();
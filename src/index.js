import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import 'normalize.css';

import reportWebVitals from './reportWebVitals';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
// Start on eng
import catalogEn from './locales/en/messages.js';
i18n.load('en', catalogEn.messages);
i18n.activate('en');

ReactDOM.render(
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>,
  document.getElementById('root')
);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

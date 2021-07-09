import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

//for Internationalization
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
// import { messages } from './locales/en/messages.js';
// import Inbox from './Inbox.js';
import catalogEn from './locales/en/messages.js';
i18n.load('en', catalogEn.messages);
i18n.activate('en');

/* const App = () => (
  <I18nProvider i18n={i18n}>
    <Inbox />
  </I18nProvider>
) */

ReactDOM.render(
  <I18nProvider i18n={i18n}>
    <App />
  </I18nProvider>,
  document.getElementById('root')
);
reportWebVitals();


// render(<App />, document.getElementById('app'))

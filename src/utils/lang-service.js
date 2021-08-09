import { i18n } from '@lingui/core';
import { LangsArray } from './lang-import-data';

import setLanguage from '../api/language_set';

const currentLang = localStorage.getItem('language');
const langKey = 'language';

const switchLang = (lang) => {
  switch (lang) {
    case 'rus':
      LangsArray.forEach((langs) => {
        i18n.load('ru', langs.ru.messages);
      });
      i18n.activate('ru');
      setLanguage('rus');
      break;
    case 'eng':
      LangsArray.forEach((langs) => {
        i18n.load('en', langs.en.messages);
      });
      i18n.activate('en');
      setLanguage('eng');
      break;
    default:
      switchLang('eng');
      lang = 'eng';
      break;
  }
  localStorage.setItem(langKey, lang);
};

const defineLang = () => {
  if (currentLang?.lang) {
    switchLang(currentLang.lang);
  } else if (localStorage.getItem(langKey)) {
    switchLang(localStorage.getItem(langKey));
  } else {
    switchLang('eng');
  }
};

export { switchLang, defineLang };

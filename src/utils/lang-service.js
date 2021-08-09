import { i18n } from '@lingui/core';
import { LangsArray } from './lang-import-data';

import setLanguage from '../api/language_set';

import { userLanguageKey } from '../constants/localStorageConstants';
import { language_english, language_russian } from '../constants/languageConstants';

const saveLanguageToLocalstorage = (responseData) => {
  localStorage.setItem(userLanguageKey, JSON.stringify(responseData.language));
};

const currentLang = localStorage.getItem(userLanguageKey);

const switchLang = (lang) => {
  switch (lang) {
    case language_russian:
      LangsArray.forEach((langs) => {
        i18n.load('ru', langs.ru.messages);
      });
      i18n.activate('ru');
      setLanguage(language_russian);
      break;
    case language_english:
      LangsArray.forEach((langs) => {
        i18n.load('en', langs.en.messages);
      });
      i18n.activate('en');
      setLanguage(language_english);
      break;
    default:
      switchLang(language_english);
      lang = language_english;
      break;
  }
  localStorage.setItem(userLanguageKey, lang);
};

const defineLang = () => {
  if (currentLang) {
    switchLang(currentLang);
  } else if (localStorage.getItem(userLanguageKey)) {
    switchLang(localStorage.getItem(userLanguageKey));
  } else {
    switchLang(language_english);
  }
};

export { switchLang, defineLang, saveLanguageToLocalstorage };

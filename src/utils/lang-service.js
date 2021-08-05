import { i18n } from '@lingui/core';
import { LangsArray } from './lang-import-data';

const currentLang = JSON.parse(localStorage.getItem('jwt=data'));
const langKey = 'lang';

const switchLang = (lang) => {
  switch (lang) {
    case 'ru':
      LangsArray.forEach((langs) => {
        i18n.load('ru', langs.ru.messages);
      });
      i18n.activate('ru');
      break;
    case 'en':
      LangsArray.forEach((langs) => {
        i18n.load('en', langs.en.messages);
      });
      i18n.activate('en');
      break;
    default:
      switchLang('en');
      lang = 'en';
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
    switchLang('en');
  }
};

export { switchLang, defineLang };

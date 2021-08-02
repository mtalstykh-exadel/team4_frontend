import { i18n } from '@lingui/core';

import testLevelEn from '@lingui/loader!../components/TestLevelSelector/locales/en/messages.po';
import testLevelRu from '@lingui/loader!../components/TestLevelSelector/locales/ru/messages.po';

import headerEn from '@lingui/loader!../components/header/locales/en/messages.po';
import headerRu from '@lingui/loader!../components/header/locales/ru/messages.po';

import loginEn from '@lingui/loader!../components/LoginForm/locales/en/messages.po';
import loginRu from '@lingui/loader!../components/LoginForm/locales/ru/messages.po';

import testInfoEn from '@lingui/loader!../components/TestsInfo/locales/en/messages.po';
import testInfoRu from '@lingui/loader!../components/TestsInfo/locales/ru/messages.po';

import testEn from '@lingui/loader!../pages/Test/locales/en/messages.po';
import testRu from '@lingui/loader!../pages/Test/locales/ru/messages.po';

import page404En from '@lingui/loader!../pages/Page404/locales/en/messages.po';
import page404Ru from '@lingui/loader!../pages/Page404/locales/ru/messages.po';

import testVerifyEn from '@lingui/loader!../components/TestsForVerificationTable/locales/en/messages.po';
import testVerifyRu from '@lingui/loader!../components/TestsForVerificationTable/locales/ru/messages.po';

import testEditEn from '@lingui/loader!../components/EditTests/locales/en/messages.po';
import testEditRu from '@lingui/loader!../components/EditTests/locales/ru/messages.po';

import adminDistibuteEn from '@lingui/loader!../pages/AdminDistribution/locales/en/messages.po';
import adminDistibuteRu from '@lingui/loader!../pages/AdminDistribution/locales/ru/messages.po';

const currentLang = JSON.parse(localStorage.getItem('jwt=data'));
const langKey = 'lang';

const switchLang = (lang) => {
  switch (lang) {
    case 'ru':
      i18n.load('ru', testLevelRu.messages);
      i18n.load('ru', headerRu.messages);
      i18n.load('ru', loginRu.messages);
      i18n.load('ru', testInfoRu.messages);
      i18n.load('ru', testRu.messages);
      i18n.load('ru', page404Ru.messages);
      i18n.load('ru', testVerifyRu.messages);
      i18n.load('ru', testEditRu.messages);
      i18n.load('ru', adminDistibuteRu.messages);
      i18n.activate('ru');
      break;
    case 'en':
      i18n.load('en', testLevelEn.messages);
      i18n.load('en', headerEn.messages);
      i18n.load('en', loginEn.messages);
      i18n.load('en', testInfoEn.messages);
      i18n.load('en', testEn.messages);
      i18n.load('en', page404En.messages);
      i18n.load('en', testVerifyEn.messages);
      i18n.load('en', testEditEn.messages);
      i18n.load('en', adminDistibuteEn.messages);
      i18n.activate('en');
      break;
    default:
      i18n.load('en', testLevelEn.messages);
      i18n.load('en', headerEn.messages);
      i18n.load('en', loginEn.messages);
      i18n.load('en', testInfoEn.messages);
      i18n.load('en', testEn.messages);
      i18n.load('en', page404En.messages);
      i18n.load('en', testVerifyEn.messages);
      i18n.load('en', adminDistibuteEn.messages);
      i18n.activate('en');
      lang = 'en';
      break;
  }
  localStorage.setItem(langKey, lang);
};

const defineLang = () => {
  if (currentLang?.lang) {
    switchLang(currentLang.lang);
  }
  else if (localStorage.getItem(langKey)) {
    switchLang(localStorage.getItem(langKey));
  }
  else {
    switchLang('en');
  }
};

export { switchLang, defineLang };

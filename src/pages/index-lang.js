import testEn from '@lingui/loader!./Test/locales/en/messages.po';
import testRu from '@lingui/loader!./Test/locales/ru/messages.po';

import page404En from '@lingui/loader!./Page404/locales/en/messages.po';
import page404Ru from '@lingui/loader!./Page404/locales/ru/messages.po';

import adminDistibuteEn from '@lingui/loader!./AdminDistribution/locales/en/messages.po';
import adminDistibuteRu from '@lingui/loader!./AdminDistribution/locales/ru/messages.po';

export const pagesLangsArray = [
  {
    en: testEn,
    ru: testRu,
  },
  {
    en: page404En,
    ru: page404Ru,
  },
  {
    en: adminDistibuteEn,
    ru: adminDistibuteRu,
  },
];
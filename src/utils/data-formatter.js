import moment from 'moment';
import 'moment/locale/ru';

import { userLanguageKey } from '../constants/localStorageConstants';
import { language_russian } from '../constants/languageConstants';

const formatDate = (date) => {
  localStorage.getItem(userLanguageKey) === language_russian ? moment.locale('ru') : moment.locale('en');
  return moment(date).format('DD MMM YYYY, hh:mm');
};

export { formatDate };

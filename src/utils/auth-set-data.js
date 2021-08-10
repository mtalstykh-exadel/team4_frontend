import { saveJWTtoLocalstorage } from './jwt-parser';
import { saveLanguageToLocalstorage } from './lang-service';

const saveDataToLocalStorage = (responseData) => {
  saveJWTtoLocalstorage(responseData);
  saveLanguageToLocalstorage(responseData);
};

export { saveDataToLocalStorage };

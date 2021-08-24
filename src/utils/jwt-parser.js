import jwt_decode from 'jwt-decode';
import { jwtTokenKey, jwtDataKey } from '@constants/localStorageConstants';

const saveJWTtoLocalstorage = (responseData) => {
  localStorage.setItem(jwtTokenKey, JSON.stringify(responseData.token));
  localStorage.setItem(jwtDataKey, JSON.stringify(jwt_decode(responseData.token)));
};

const getJWTdata = () => {
  return JSON.parse(localStorage.getItem(jwtDataKey));
};

const getJWTtoken = () => {
  return JSON.parse(localStorage.getItem(jwtTokenKey));
};

const removeJWTfromLocalstorage = () => {
  localStorage.removeItem(jwtDataKey);
  localStorage.removeItem(jwtTokenKey);
};

export { saveJWTtoLocalstorage , getJWTdata, getJWTtoken, removeJWTfromLocalstorage };

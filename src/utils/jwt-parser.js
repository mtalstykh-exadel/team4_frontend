import jwt_decode from 'jwt-decode';
const jwtTokenKey = 'jwt=token';
const jwtDataKey = 'jwt=data';
const userLanguage = 'language';

const saveJWTtoLocalstorage = (token) => {
  localStorage.setItem(jwtTokenKey, JSON.stringify(token.token));
  localStorage.setItem(jwtDataKey, JSON.stringify(jwt_decode(token.token)));
  localStorage.setItem(userLanguage, JSON.stringify(token.language));
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


import jwt_decode from "jwt-decode";
const jwtTokenKey = "jwt=token";
const jwtDataKey = "jwt=data";

const saveJWT = (token) => {
  localStorage.setItem(jwtTokenKey, JSON.stringify(token));
  localStorage.setItem(jwtDataKey, JSON.stringify(jwt_decode(token)));
};

const getJWTdata = () => {
  return JSON.parse(localStorage.getItem(jwtDataKey));
};

const getJWTtoken = () => {
  return JSON.parse(localStorage.getItem(jwtTokenKey));
};

const removeJWT = () => {
  localStorage.removeItem(jwtDataKey);
  localStorage.removeItem(jwtTokenKey);
};

export { saveJWT, getJWTdata, getJWTtoken, removeJWT };


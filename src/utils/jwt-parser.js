import jwt_decode from "jwt-decode";
const jwtKey = "jwt=data";

const saveJWT = (token) => {
  localStorage.setItem(jwtKey, JSON.stringify(jwt_decode(token)));
};

const getJWT = () => {
  return JSON.parse(localStorage.getItem(jwtKey));
};

const removeJWT = () => {
  localStorage.removeItem(jwtKey);
};

export { saveJWT, getJWT, removeJWT };


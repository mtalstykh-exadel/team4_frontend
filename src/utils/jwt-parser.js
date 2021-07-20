import jwt_decode from "jwt-decode";
const jwtKey = "jwt=data";
let data = null;

const saveJWT = () => {
  localStorage.setItem(jwtKey, JSON.stringify(data));
};

const parseJWT = (token) => {
    data = jwt_decode(token);
    saveJWT();
};

const getJWT = () => {
    return JSON.parse(localStorage.getItem(jwtKey));
};

const removeJWT = () => {
    localStorage.removeItem(jwtKey);
};

export {saveJWT, parseJWT, getJWT, removeJWT};


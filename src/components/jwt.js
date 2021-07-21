import { saveJWT, getJWT } from "../utils/jwt-parser";
const handlejwt = async (url, data) => {
  return await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },})
    .then((data) => data.json())
    .then((data) => {saveJWT(data);
      console.log(JSON.stringify(getJWT()));})
    .catch((e) => console.log(e));
};

export default handlejwt;

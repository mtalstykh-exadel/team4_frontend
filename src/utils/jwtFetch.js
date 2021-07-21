import { saveJWT } from "./jwt-parser";
const handlejwt = async (url, data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((token) => saveJWT(token));
};

export default handlejwt;

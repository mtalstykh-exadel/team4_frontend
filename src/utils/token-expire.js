import { getJWTdata } from "./jwt-parser";

const calculateRemainingTime = () => {
  const currentTime = new Date().getTime() / 1000;
  const adjExpirationTime = new Date(getJWTdata().exp);
  const remainingTime = (adjExpirationTime - currentTime) * 1000;
  return remainingTime;
};

export { calculateRemainingTime };

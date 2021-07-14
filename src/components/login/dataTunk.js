const timeout = function (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

const rand = () => Math.random() < .9;

const getLoginData = (data) => {
  return timeout(1500).then(() =>
    rand()
      ? Promise.resolve(data)
      : Promise.reject(new Error('Login Error')));
};

export default getLoginData;

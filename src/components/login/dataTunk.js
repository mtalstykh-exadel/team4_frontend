const timeout = function (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

const getLoginData = (data) => {
  return timeout(1500)
    .then(() => Promise.resolve(data));
};

export default getLoginData;

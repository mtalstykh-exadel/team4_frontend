const testTimerHandler = (minutes) => {
  const testTimerDomElement = document.getElementById("test-timer");
  if (testTimerDomElement) {
    let timeSeconds = minutes * 60 - 1;
    setInterval(() => {
      let seconds = timeSeconds % 60;
      const minutes = (timeSeconds / 60) % 60;
      if (timeSeconds <= 0) {
        testTimerDomElement.textContent = "0:00";
      } else {
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        timeSeconds--;
        testTimerDomElement.textContent = `${Math.floor(minutes)}:${seconds}`;
      }
    }, 1000);
  }
};

export { testTimerHandler };

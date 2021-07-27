let audioDuration = 0;
let timeSeconds;
let timer;

const speakingTimerHandler = (timerOn) => {
  const speakingTimerDomElement = document.getElementById("speaking-timer");
  timeSeconds = 299;
  if (timerOn === false) {
    return stopTimer(speakingTimerDomElement);
  } else {
    startTimer(speakingTimerDomElement);
  }
};

const stopTimer = (element) => {
  clearInterval(timer);
  element.textContent = "5:00";
  return audioDuration;
};

const startTimer = (element) => {
  audioDuration = 0;
  timer = setInterval(() => {
    let seconds = timeSeconds % 60;
    const minutes = (timeSeconds / 60) % 60;
    if (timeSeconds < 0) {
      stopTimer(element);
    } else {
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      ++audioDuration;
      --timeSeconds;
      element.textContent = `${Math.floor(minutes)}:${seconds}`;
    }
  }, 1000);
};

export { speakingTimerHandler };

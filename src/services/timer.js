let audioDuration = 0;
let timeMinut;
let timer;

const speakingTimerHandler = (timerOn) => {
  const speakingTimerDomElement = document.getElementById("speaking-timer");
  timeMinut = 300;
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
    let seconds = timeMinut % 60;
    const minutes = (timeMinut / 60) % 60;
    if (timeMinut < 0) {
      stopTimer(element);
    } else {
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      ++audioDuration;
      --timeMinut;
      element.textContent = `${Math.floor(minutes)}:${seconds}`;
    }
  }, 1000);
};

export { speakingTimerHandler };

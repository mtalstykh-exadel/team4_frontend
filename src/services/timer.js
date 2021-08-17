import {sendingHandler} from '../components/Test/SubmitModal/SubmitModalHandler';

let audioDuration = 0;
const timers = [];

const stopTimer = (domId) => {
  clearInterval(timers.pop());
  if (domId !== 'test-timer') {
    document.getElementById(domId).textContent = '5:00';
    return audioDuration;
  }
  if (document.getElementById(domId) !== null) {
    if (domId === 'test-timer' && document.getElementById(domId).textContent === '0:00') {
      sendingHandler();
    }
  }
};

const createTimer = ({domId, seconds}) => {
  seconds--;
  timers.push(
    setInterval(() => {
      const element = document.getElementById(domId);
      const localeMinutes = (seconds / 60) % 60;
      let localeSeconds = seconds % 60;
      if (!element) {
        stopTimer(domId);
      } else {
        if (localeSeconds < 10) {
          localeSeconds = '0' + localeSeconds;
        }
        if (seconds <= 0) {
          element.textContent = '0:00';
          stopTimer(domId);
        }
        seconds--;
        if (domId !== 'test-timer') {
          ++audioDuration;
        }
        element.textContent = `${Math.floor(localeMinutes)}:${localeSeconds}`;
      }
    }, 1000)
  );
  return {id: timers.length - 1};
};

const startTimer = ({id}) => {
  timers[id];
  audioDuration = 0;
};

export { startTimer, createTimer, stopTimer };

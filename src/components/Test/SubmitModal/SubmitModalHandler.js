import {
  saveSpeaking,
  saveListeningAndGrammar,
  saveEssay,
  testFinish
} from '../../../api/test-set';

import {
  testEassyUserAnswers,
  testListeningUserAnswers,
  testGrammarUserAnswers,
  testSpeakingFile,
  currentTest,
} from '../../../constants/localStorageConstants';

const dataURItoBlob = (dataURI) => {
  if (dataURI !== null) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const dw = new DataView(ab);

    for (let i = 0; i < byteString.length; i++) {
      dw.setUint8(i, byteString.charCodeAt(i));
    }
    return new Blob([ab], { type: mimeString });
  }
  return null;
};

const changeArray = (array) => {
  return array === null ? [] : array.map((element) => ({
    questionId: element.qID,
    answerId: element.aID,
    testId: JSON.parse(localStorage.getItem(currentTest)).id,
  }));
};

const sendingHandler = () => {
  const essayAnswer = JSON.parse(localStorage.getItem(testEassyUserAnswers));

  const promiseEssay = saveEssay(essayAnswer !== null ? essayAnswer.answer : 'The user has not completed this module');
  const promiseListeningAndGrammar = saveListeningAndGrammar([
    ...changeArray(JSON.parse(localStorage.getItem(testListeningUserAnswers))),
    ...changeArray(JSON.parse(localStorage.getItem(testGrammarUserAnswers))),
  ]);
  const promiseSpeaking = saveSpeaking(dataURItoBlob(localStorage.getItem(testSpeakingFile)));

  Promise.all([promiseEssay, promiseListeningAndGrammar, promiseSpeaking]).then(() => {
    testFinish().then(() => window.location.href = '/result');
  });

};

export { sendingHandler };

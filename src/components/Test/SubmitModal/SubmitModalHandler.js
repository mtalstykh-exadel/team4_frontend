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
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const dw = new DataView(ab);

  for (let i = 0; i < byteString.length; i++) {
    dw.setUint8(i, byteString.charCodeAt(i));
  }
  return new Blob([ab], { type: mimeString });
};

const changeArray = (array) => {
  if (array === null) {
    return [];
  }

  return array.map((element) => ({
    questionId: element.qID,
    answerId: element.aID,
    testId: JSON.parse(localStorage.getItem(currentTest)).id,
  }));
};

const sendingHandler = () => {
  const essayAnswer = JSON.parse(localStorage.getItem(testEassyUserAnswers));
  saveEssay(essayAnswer !== null ? essayAnswer.answer : '');
  saveListeningAndGrammar([
    ...changeArray(JSON.parse(localStorage.getItem(testListeningUserAnswers))),
    ...changeArray(JSON.parse(localStorage.getItem(testGrammarUserAnswers))),
  ]);
  saveSpeaking(dataURItoBlob(localStorage.getItem(testSpeakingFile)));
  testFinish();
};

export { sendingHandler };

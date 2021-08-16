import axiosInstance from './axios';
import { currentTest } from '../constants/localStorageConstants';

const saveEssay = ( essayAnswer ) => {
  return axiosInstance.post('/answer/essay/' + JSON.parse(localStorage.getItem(currentTest)).id, essayAnswer);
};

const testFinish = ( ) => {
  return axiosInstance.post('/tests/finish/' + JSON.parse(localStorage.getItem(currentTest)).id);
};

const saveListeningAndGrammar = ( arrayAnswers ) => {
  return axiosInstance.post('/chosen_option/all/', arrayAnswers);
};

const saveSpeaking = ( blob ) => {
  if (blob !== null) {
    const formData = new FormData();
    formData.append('file', blob, {type: blob.type});
    return axiosInstance.post('/answer/speaking/' + JSON.parse(localStorage.getItem(currentTest)).id, formData, {
      headers: { 'Content-Type': 'multipart/form-data;'}
    });
  }
};

export {saveSpeaking, saveListeningAndGrammar, saveEssay, testFinish};

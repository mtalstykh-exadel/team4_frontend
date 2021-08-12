import axiosInstance from './axios';
import { currentTest } from '../constants/localStorageConstants';

const saveEssay = ( essayAnswer ) => {
    return axiosInstance.post('/answer/essay/' + JSON.parse(localStorage.getItem(currentTest)).id, essayAnswer).then((response) => response.data);
};

const saveListeningAndGrammar = ( arrayAnswers ) => {
    return axiosInstance.post('/chosen_option/all/', arrayAnswers).then((response) => response.data);
};

const saveSpeaking = ( blob ) => {
    const FormData = new FormData();
    FormData.append('file', blob, {type: blob.type});

    return axiosInstance.post('/answer/speaking/' + JSON.parse(localStorage.getItem(currentTest)).id, FormData,
        {
            headers: { 'Content-Type': 'multipart/form-data;'
        }
    });
};

export {saveSpeaking, saveListeningAndGrammar, saveEssay};

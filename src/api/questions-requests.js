import axiosInstance from './axios';

export const getSingleQuestion = async (id) => {
  return axiosInstance.get(`/question/${id}`).then((response) => response.data);
};

export const requestToArchiveAndDearchive = async (id, available) => {
  return axiosInstance.put(`/question/${id}?available=${available}`).then((response) => response.data);
};
export const requestToArchiveAndDearchiveListening = async (id, available) => {
  return axiosInstance.put(`/question/listening/${id}?available=${available}`).then((response) => response.data);
};

export const getSingleListeningQuestion = async (id) => {
  return axiosInstance.get(`/question/listening/${id}`).then((response) => response.data);
};

export const sendEditedQuestion = async (quest) => {
  return axiosInstance.put(`/question/update/${quest.id}`, quest).then((response) => response.data);
};

export const sendEditedListeningQuestion = async (quest) => {
  return axiosInstance.put(`/question/update/listening/${quest.id}`, quest);
};

export const sendNewAudio = async (file) => {
  const formData = new FormData();
  formData.append('file', file, 'data');
  return axiosInstance.post('files/listening', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((response) => response.data);
};

export const addNewListeningQuestion = async (quest) => {
  return axiosInstance.post('/question/listening', quest).then((response) => response.data);
};

export const addNewQuestion = async (quest) => {
  return axiosInstance.post('/question/', quest).then((response) => response.data);
};

export const getQuestionsList = async (level, module, status, pageNum, pageSize) => {
  return axiosInstance.get(`/question/?level=${level}&module=${module}&pageNumb=${pageNum}&pageSize=${pageSize}&status=${status}`).then((response) => response.data);
};

export const getListeningQuestionsList = async (level, status, pageNum, pageSize) => {
  return axiosInstance.get(`/question/listening?level=${level}&pageNumb=${pageNum}&pageSize=${pageSize}&status=${status}`).then((response) => response.data);
};

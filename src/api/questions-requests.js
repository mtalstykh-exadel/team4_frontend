import axiosInstance from './axios';

export const getSingleQuestion = async (id) => {
  return axiosInstance.get(`/question/${id}`).then((response) => response.data);
};

export const requestToArchiveQuestion = async (id) => {
  return axiosInstance.delete(`/question/${id}`).then((response) => response.data);
};

export const getSingleListeningQuestion = async (id) => {
  return axiosInstance.get(`/question/listening/${id}`).then((response) => response.data);
};

export const sendEditedQuestion = async (quest) => {
  return axiosInstance.put(`/question/${quest.id}`, quest).then((response) => response.data);
};

export const sendEditedListeningQuestion = async (quest) => {
  debugger;
  return axiosInstance.put(`/question/listening/${quest.id}`, quest).then((response) => response.data);
};

export const addNewQuestion = async (quest) => {
  return axiosInstance.post('/question/', quest).then((response) => response.data);
};

export const getQuestionsList = async (level, module, status) => {
  return axiosInstance.get(`/question/?level=${level}&module=${module}&status=${status}&pageNumb=${1}&pageSize=${10}`)
  .then((response) => response.data);
};

export const getListeningQuestionsList = async (level, status) => {
  return axiosInstance.get(`/question/listening?level=${level}&status=${status}`).then((response) => response.data);
};

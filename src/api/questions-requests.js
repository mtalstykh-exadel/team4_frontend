import axiosInstance from './axios';

export const getSingleQuestion = async (id) => {
  return axiosInstance.get(`/question/${id}` )
    .then((response) => response.data);
};

export const setEditedQuestion = async (quest) => {
  return axiosInstance.put(`/question/${quest.id}`, quest )
    .then((response) => response.data);
};

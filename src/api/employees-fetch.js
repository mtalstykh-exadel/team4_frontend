import axiosInstance from './axios';

const getEmployeesList = () => {
  return axiosInstance.get('/employees')
    .then((response) => response.data);
};

const getEmployeeHistory = (id) => {
  return axiosInstance.get(`/tests/history/${id}`)
    .then((response) => response.data);
};

const assignTest = (id, values) => {
  const date = new Date(values['datetime-local']).toISOString();
  return axiosInstance.post(`/tests/assign/${id}`, {
    deadline: date,
    level: values.module.substr(-3 , 2),
    priority: values.priority.toUpperCase()
  });
};

const deassignTest = (id) => {
  return axiosInstance.post(`/tests/deassign/${id}`);
};

export { getEmployeesList, getEmployeeHistory, assignTest, deassignTest };

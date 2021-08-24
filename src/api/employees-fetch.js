import axiosInstance from './axios';

const getEmployeesList = (name, pageNum, pageSize) => {
  return axiosInstance.get(`/employees?${name ? `name=${name}` : ''}&pageNumb=${pageNum}&pageSize=${pageSize}`)
    .then((response) => response.data);
};

const getEmployeeHistory = (id, level, pageNum, pageSize) => {
  return axiosInstance.get(`/tests/history/${id === undefined ? 0 : id}?level=${level}&pageNumb=${pageNum}&pageSize=${pageSize}`)
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

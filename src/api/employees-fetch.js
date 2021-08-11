import axiosInstance from './axios';

const getEmployees = () => {
  return axiosInstance.get('/employees')
    .then((response) => response.data);
};

const assignTest = (id) => {
  console.log('assign', id);
  return axiosInstance.post(`/tests/assign/${id}`, {
    deadline: '2021-08-11T14:53:18.604Z',
    level: 'A1',
    priority: 'HIGH'
  });
};


const deassignTest = (id) => {
  console.log('deassign', id);
  return axiosInstance.post('/tests/deassign/171');
};

export { getEmployees, assignTest, deassignTest };

import { REQUEST_EMPLOYEES_LIST } from './actionTypes';
import { getEmployees } from '../../api/employees-fetch';

export const setEmployeesList = (filteredEmployees) => ({ type: REQUEST_EMPLOYEES_LIST, filteredEmployees });

export const requestEmployeesList = () => (dispatch) => {
  // TODO make a request to the server for employees list
  getEmployees()
    .then((data) => (dispatch(setEmployeesList(data))));
};

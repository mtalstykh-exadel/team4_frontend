import { REQUEST_EMPLOYEES_LIST } from './actionTypes';
import getEmployees from '../../api/employees-fetch';

export const setEmployeesList = (filteredEmployees) => ({ type: REQUEST_EMPLOYEES_LIST, filteredEmployees });

export const requestEmployeesList = () => (dispatch) => {
  getEmployees()
    .then((data) => (dispatch(setEmployeesList(data))));
};

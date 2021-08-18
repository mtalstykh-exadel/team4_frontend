import { REQUEST_EMPLOYEES_LIST, REQUEST_EMPLOYEE_HISTORY } from './actionTypes';
import { getEmployeesList, getEmployeeHistory } from '../../api/employees-fetch';

export const setEmployeesList = (employee) => ({ type: REQUEST_EMPLOYEES_LIST, employee });
export const setEmployee = (employee) => ({ type: REQUEST_EMPLOYEE_HISTORY, employee });

export const requestEmployeesList = (pageNum, pageSize) => (dispatch) => {
  return getEmployeesList(pageNum, pageSize)
    .then((data) => (dispatch(setEmployeesList(data))));
};

export const requestEmployeeHistory = (name) => (dispatch) => {
  return getEmployeeHistory(name)
    .then((data) => (dispatch(setEmployee(data))));
};


import { REQUEST_EMPLOYEES_LIST } from './actionTypes';
import { filteredEmployees } from '../../components/Employees/EmployeesTable/mock-data-employees';

export const setEmployeesList = (filteredEmployees) => ({ type: REQUEST_EMPLOYEES_LIST, filteredEmployees });

export const requestEmployeesList = () => (dispatch) => {
  // TODO make a request to the server for employees list
  dispatch(setEmployeesList(filteredEmployees));
};

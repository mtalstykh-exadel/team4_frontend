import { REQUEST_EMPLOYEES_LIST, REQUEST_EMPLOYEE_HISTORY } from '@actions/actionTypes';

export const employeesReducer = (state = null, action) => {
  switch (action.type) {
    case REQUEST_EMPLOYEES_LIST:
      return action.employee;
    default:
      return state;
  }
};

export const employeeHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_EMPLOYEE_HISTORY:
      return action.employee;
    default:
      return state;
  }
};

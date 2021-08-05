import { REQUEST_EMPLOYEES_LIST } from '../actions/actionTypes';

const initialState = {
  filteredEmployees: null
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EMPLOYEES_LIST:
      return Object.assign({}, state, {
        filteredEmployees: action.filteredEmployees,
      });
    default:
      return state;
  }
};

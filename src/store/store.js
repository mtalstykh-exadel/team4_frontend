import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { jwtReducer } from './reducers/jwtReducers';
import { authReducer } from './reducers/authReducers';
import { themeReducer } from './reducers/themeReducers';
import { profileReducer } from './reducers/profileReducers';
import { coachReducer } from './reducers/coachReducer';
import { employeesReducer, employeeHistoryReducer } from './reducers/employeesReducer';
import { adminReducer } from './reducers/adminReducer';
import { unverifiedTestsReducer, reportsReducer } from './reducers/unverifiedTestsReducers';
import { notificationReducer } from './reducers/headerReducer';

const rootReducers = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  jwt: jwtReducer,
  admin: adminReducer,
  coach: coachReducer,
  theme: themeReducer,
  employees: employeesReducer,
  employee: employeeHistoryReducer,
  unverifiedTests: unverifiedTestsReducer,
  unverifiedTest: reportsReducer,
  notifications: notificationReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

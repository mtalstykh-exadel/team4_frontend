import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
import { counterReducer } from './reducers/counterReducers';
import { authReducer } from './reducers/authReducers';
import { jwtReducer } from './reducers/jwtReducers';

const rootReducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  jwt: jwtReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
import { counterReducer } from './reducers/counterReducers';
import { loginReducer } from './reducers/loginReducers';
import { languageReducer, roleReducer } from './reducers/headerReducers';

const rootReducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  language: languageReducer,
  role: roleReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

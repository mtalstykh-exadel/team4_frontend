import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
import { counterReducer } from './reducers/counterReducers';
import { loginReducer } from './reducers/loginReducers';
import { languageReducer, roleReducer, themeReducer } from './reducers/headerReducers';

const rootReducers = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  language: languageReducer,
  role: roleReducer,
  darktheme: themeReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

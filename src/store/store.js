import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { combineReducers } from 'redux';
import { loginReducer } from './reducers/loginReducers';
import { languageReducer, roleReducer } from './reducers/headerReducers';
import { profileReducer } from './reducers/profileReducers';

const rootReducers = combineReducers({
  profile: profileReducer,
  login: loginReducer,
  language: languageReducer,
  role: roleReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

import React from "react";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(counter, composeEnhancers(applyMiddleware(thunk)));

function counter(state = 0, action) {
    // TODO: please remove it (used to avoid no-unused-vars)
    console.log(action);
    return state;
  }

function Apps() {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

  export default Apps;
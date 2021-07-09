import React from "react";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Counter from "../components/counter/counter";
import reducer from './reducers/counterReducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

function SimpleCounter() {
    return (
        <Provider store={store}>
            <Counter/>
        </Provider>
    );
}

export default SimpleCounter;
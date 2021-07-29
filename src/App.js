import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import '../src/styles/theme.scss';

import Login from './pages/Login/Login';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/Profile/Profile';
import Main from './pages/main/main';
import Page404 from "./pages/Page404/Page404";
import EditTests from './pages/editTests/editTests';
import Test from "./pages/Test/Test";
import '../src/styles/modal.scss';
import { useDispatch } from 'react-redux';
import { initApp } from './store/actions/initActions/initActions';
const App = () => {
  const dispatch = useDispatch();
  dispatch(initApp());

  return (
    <div className='App theme-wrapper'>
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/profile"><Profile /></PrivateRoute>
        <PrivateRoute path="/" exact><Main /></PrivateRoute>
        <PrivateRoute path="/edittests" ><EditTests /></PrivateRoute>
        <PrivateRoute path='/test'><Test /></PrivateRoute>
        <Route path="*" render={() => <Page404 />} />
      </Switch>
    </div>
  );
};

export default App;

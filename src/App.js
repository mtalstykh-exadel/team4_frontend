import React from 'react';
import Login from './pages/Login/Login';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/Profile/Profile';
import Main from './pages/main/Main';
import { TestsForVerification, EditTests, Page404, Test } from './pages';
import AdminDistribution from './pages/AdminDistribution/AdminDistribution';
import '../src/styles/modal.scss';
import { useDispatch } from 'react-redux';
import { tokenTimeout } from './store/actions/tokenTimeout';

const App = () => {

  const dispatch = useDispatch();
  dispatch(tokenTimeout());

  return (
    <div className="App">
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/profile"><Profile /></PrivateRoute>
        <PrivateRoute path="/" exact><Main /></PrivateRoute>
        <PrivateRoute path="/edit-tests" ><EditTests /></PrivateRoute>
        <PrivateRoute path="/tests-for-verification" ><TestsForVerification /></PrivateRoute>
        <PrivateRoute path="/admin-distribution"><AdminDistribution /></PrivateRoute>
        <PrivateRoute path='/test'><Test /></PrivateRoute>
        <Route path="*" render={() => <Page404 />} />
      </Switch>
    </div>
  );
};

export default App;

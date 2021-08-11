import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.scss';
import '../src/styles/theme.scss';
import '../src/styles/buttons.scss';
import '../src/styles/modal.scss';

import Login from './pages/Login/Login';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/Profile/Profile';
import Main from './pages/Main/Main';
import { TestsForVerification, EditTests, Employees, Page404, Test, ManageTest } from './pages';
import AdminDistribution from './pages/AdminDistribution/AdminDistribution';

import { initApp } from './store/actions/initActions/initActions';

const App = () => {
  const dispatch = useDispatch();
  dispatch(initApp());
  
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path='/profile'><Profile /></PrivateRoute>
        <PrivateRoute path='/' exact><Main /></PrivateRoute>
        <PrivateRoute path='/edit-tests' ><EditTests /></PrivateRoute>
        <PrivateRoute path='/tests-for-verification' ><TestsForVerification /></PrivateRoute>
        <PrivateRoute path='/admin-distribution'><AdminDistribution /></PrivateRoute>
        <PrivateRoute path='/employees'><Employees /></PrivateRoute>
        <PrivateRoute path='/test'><Test /></PrivateRoute>
        <PrivateRoute path='/edit-test-modules'><ManageTest /></PrivateRoute>
        <PrivateRoute path='/add-test-modules'><ManageTest /></PrivateRoute>
        <Route path='*' render={() => <Page404 />} />
      </Switch>
    </div>
  );
};

export default App;

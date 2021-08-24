import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.scss';
import '@globalStyles/theme.scss';
import '@globalStyles/buttons.scss';
import '@globalStyles/modal.scss';

import Login from '@pages/Login/Login';
import PrivateRoute from '@utils/privateRoute';
import Profile from '@pages/Profile/Profile';
import Main from '@pages/Main/Main';
import { TestsForVerification, EditTests, Employees, Page404, Test, ManageTest } from '@pages/index';
import AdminDistribution from './pages/AdminDistribution/AdminDistribution';
import { useRedirectHook } from '@hook/redirectHook';
import { initApp } from '@actions/initActions/initActions';
import ResultTest from '@components/ResultTest/ResultTest';
import { redirectTo, currentTest } from '@constants/localStorageConstants';

const App = () => {
  const dispatch = useDispatch();
  dispatch(initApp());
  if (useRedirectHook().get('redirect')) {
    localStorage.setItem(redirectTo, window.location.href.toString());
  } 
  if (useRedirectHook().get('id')) {
    localStorage.setItem(currentTest, JSON.stringify({id: useRedirectHook().get('id')}));
  }
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
        <PrivateRoute path='/result'>< ResultTest/></PrivateRoute>
        <Route path='*' render={() => <Page404 />} />
      </Switch>
    </div>
  );
};

export default App;

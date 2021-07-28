import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import '../src/styles/theme.scss';

import Login from './pages/login/login';
import Counter from './components/counter/counter';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import Page404 from "./pages/Page404/Page404";
import EditTests from './pages/editTests/editTests';
import Test from "./pages/Test/Test";
import '../src/styles/modal.scss';

import { useDispatch } from 'react-redux';
import { tokenTimeout } from './store/actions/tokenTimeout';

const App = () => {
  const dispatch = useDispatch();
  const darktheme = useSelector((state) => state.darktheme);
  dispatch(tokenTimeout());

  return (
    <div className={`App ${darktheme ? 'theme-dark' : 'theme-light'}`}>
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/counter"><Counter /></PrivateRoute>
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

import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import '../src/styles/theme.scss';

import Login from './pages/login/login';
import Buttons from './components/buttons/Buttons';
import Counter from './components/counter/counter';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import DemoJWT from './pages/jwt/jwt.jsx';
import Page404 from "./pages/Page404/Page404";
import EditTests from './pages/editTests/editTests';

const App = () => {
  const darktheme = useSelector((state) => state.darktheme);
  return (
    <div className={`App ${darktheme ? 'theme-dark' : 'theme-light'}`}>
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/buttons"><Buttons /></PrivateRoute>
        <PrivateRoute path="/counter"><Counter /></PrivateRoute>
        <PrivateRoute path="/profile"><Profile /></PrivateRoute>
        <PrivateRoute path="/" exact><Main /></PrivateRoute>
        <PrivateRoute path="/jwt" ><DemoJWT /></PrivateRoute>
        <PrivateRoute path="/edittests" ><EditTests /></PrivateRoute>
        <Route path="*" render={() => <Page404 />} />

      </Switch>
    </div>
  );
};

export default App;

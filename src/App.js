import React from 'react';
import Login from './pages/login/Login';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/profile/Profile';
import Main from './pages/main/main';
import DemoJWT from './pages/jwt/jwt.jsx';
import Page404 from "./pages/Page404/Page404";
import EditTests from './pages/editTests/editTests';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/profile"><Profile /></PrivateRoute>
        <PrivateRoute path="/jwt" ><DemoJWT /></PrivateRoute>
        <PrivateRoute path="/" exact><Main /></PrivateRoute>
        <PrivateRoute path="/edittests" ><EditTests /></PrivateRoute>
        <Route path="*" render={() => <Page404 />} />
      </Switch>
    </div>
  );
};

export default App;

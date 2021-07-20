import React from 'react';
import Login from './pages/loginPage/login';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import DemoJWT from './pages/jwt/jwt.jsx';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/profile"><Profile /></PrivateRoute>
        <PrivateRoute path="/jwt" ><DemoJWT /></PrivateRoute>
        <PrivateRoute path="/" exact><Main /></PrivateRoute>
        <Route path="*" render={() => <div>This page is not defined</div>} />
      </Switch>
    </div>
  );
};


export default App;

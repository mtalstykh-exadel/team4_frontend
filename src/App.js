import React from 'react';
import Login from './pages/login/login';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Buttons from './components/buttons/Buttons';
import Counter from './components/counter/counter';
import PrivateRoute from './utils/privateRoute';
import Profile from './components/profile/profile';
import Main from './pages/main/main';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/buttons"><Buttons /></PrivateRoute>
        <PrivateRoute path="/counter"><Counter /></PrivateRoute>
        <PrivateRoute path="/profile"><Profile /></PrivateRoute>
        <PrivateRoute path="/"><Main /></PrivateRoute>
        <Route path="*" render={() => <div>This page is not defined</div>} />
      </Switch>
    </div>
  );
}

export default App;

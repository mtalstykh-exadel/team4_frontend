import React from 'react';
import Login from './pages/login/Login';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/Profile/Pofile';
import Main from './pages/main/main';
import Page404 from "./pages/Page404/Page404";
import EditTests from './pages/editTests/editTests';
import Test from "./pages/Test/Test";
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
        <PrivateRoute path="/edittests" ><EditTests /></PrivateRoute>
        <PrivateRoute path='/test'><Test /></PrivateRoute>
        <Route path="*" render={() => <Page404 />} />
      </Switch>
    </div>
  );
};

export default App;

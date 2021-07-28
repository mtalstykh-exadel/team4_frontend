import React from 'react';
// import Login from './pages/Login/Login';
import {Switch, Route} from 'react-router-dom';
import './App.scss';
import PrivateRoute from './utils/privateRoute';
import Profile from './pages/profile/profile';
import Main from './pages/main/main';
import DemoJWT from './pages/jwt/jwt.jsx';
import Page404 from "./pages/Page404/Page404";
import EditTests from './pages/editTests/editTests';
import '../src/styles/modal.scss';
import Test from "./pages/Test/Test";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/404' render={() => <Page404/>}/>
        <PrivateRoute path="/profile"><Profile/></PrivateRoute>
        <PrivateRoute path="/jwt"><DemoJWT/></PrivateRoute>
        <PrivateRoute path="/" exact><Main/></PrivateRoute>
        <PrivateRoute path="/test" exact><Test/></PrivateRoute>
        <PrivateRoute path="/edittests"><EditTests/></PrivateRoute>
        <Route path="*" render={() => <Page404/>}/>
      </Switch>
    </div>
  );
};

export default App;

import React from 'react';
import Login from './pages/login/Login';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Buttons from './pages/buttons/Buttons';
import { useSelector } from 'react-redux';
import { ReactComponentLike } from 'prop-types';


function App() {

  // To apply styles to material elements
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    }, testButtons: {
      '&': {
        margin: 40,
      }
    },
  }));

  const classes = useStyles();

  return (
    <div className="App">
      <div className='routingButtons'>
        <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
          <Link to='/login'>Login</Link>
        </Button>
        <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
          <Link to='/Protected'>protected</Link>
        </Button>

      </div>
      <Switch>


        <Route path='/login' render={() => <Login />} />
        <PrivateRoute path="/protected"><Buttons /></PrivateRoute>
        <Route path="*" render={() => <Login />} />
      </Switch>
    </div>
  );
}


const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.login.isAuth);
  debugger;
  return (
    <Route {...rest} render={({ location }) => auth ? (children) : (
      <Redirect to={{ pathname: "/login", state: { from: location } }} />
    )} />
  );
};
PrivateRoute.propTypes = {
  children: ReactComponentLike,
};

export default App;

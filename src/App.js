import React from 'react';
// importing login page
import Login from './pages/login/Login';
// importing components from react-router-dom for routing
import { Switch, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';

// importing the elements Material-UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Buttons from './pages/buttons/Buttons';
// brief entry: import {makeStyles, Button} from '@material-ui/core/';

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
          <Link to='/buttons'>Buttons</Link>
        </Button>
      </div>
      <Switch>
        <Route path='/login' render={() => <Login />} />
        <Route path='/buttons' render={() => <Buttons />} />
      </Switch>
    </div>
  );
}


export default App;

import React from 'react';
import Login from './pages/login/Login';
import { Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Buttons from './pages/buttons/Buttons';

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

import React from 'react';
//importing login page
import Login from './Components/Login/Login';
//importing components from react-router-dom for routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';

// importing the elements Material-UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
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
      {/* Adding the imported element */}
      {/* Link to the path login */}
      <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
        
        <Link to='/login'>Login</Link>
      </Button>
      <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
        Example button Material-UI
      </Button>
      <Button variant="contained" disabled className={classes.testButtons}>
        Example №2 disabled
      </Button>
      {/* adding routing */}
      <Switch>
        <Route path='/login' render={() => <Login />} />
      </Switch>
    </div>
  );
}
// wrapping with container component for routing
const AppContainer = () => {
  return <BrowserRouter>
    <App />
  </BrowserRouter>
}

export default AppContainer;

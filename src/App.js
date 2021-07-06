import React from 'react'
import logo from './logo.svg';
import './App.css';
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
      <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
        Пример кнопки Material-UI
      </Button>
      <Button variant="contained" disabled className={classes.testButtons}>
        Пример №2 'disabled'
      </Button>
    </div>
  );
}

export default App;

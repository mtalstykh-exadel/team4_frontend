import React from 'react'
import logo from './logo.svg';
import './App.css';
// импортируем элементы Material-UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
// краткая запись: import {makeStyles, Button} from '@material-ui/core/';

import { classes } from 'istanbul-lib-coverage';

function App() {

  // Для применения стилей к material элементам
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
      {/* Вставляем импортированный элемент */}
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

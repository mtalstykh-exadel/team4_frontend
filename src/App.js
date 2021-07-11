import React from 'react';
import SimpleCounter from './store/store';
import './App.scss';
import { Trans } from '@lingui/macro';
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
      <Button variant="contained" color="primary" disableElevation className={classes.testButtons}>
        <Trans>Example button Material-UI</Trans>
      </Button>
      <Button variant="contained" disabled className={classes.testButtons}>
        <Trans>Example №2 disabled</Trans>
      </Button>
      <SimpleCounter />
    </div>
  );
}

export default App;

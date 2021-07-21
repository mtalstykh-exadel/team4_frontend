import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Profile = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    testButtons: {
      "&": {
        margin: 40,
      },
    },
  }));
  const classes = useStyles();

  return (
    <div className="routingButtons">
      <Button
        variant="contained"
        disabled
        className={`${classes.testButtons} primary-contained`}
      >
        <Link to="/login">Login</Link>
      </Button>
      <Button
        variant="contained"
        disableElevation
        className={`${classes.testButtons} primary-contained`}
      >
        <Link to="/counter">Counter</Link>
      </Button>
      <Button
        variant="contained"
        disableElevation
        className={`${classes.testButtons} primary-contained`}
      >
        <Link to="/buttons">Buttons</Link>
      </Button>
      <Button
        variant="contained"
        disableElevation
        className={`${classes.testButtons} primary-contained`}
      >
        <Link to="/jwt">JWT</Link>
      </Button>
    </div>
  );
};

export default Profile;

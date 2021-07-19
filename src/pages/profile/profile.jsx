import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

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
        color="primary"
        disabled
        className={classes.testButtons}
      >
        <Link to="/login">Login</Link>
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Link to="/counter">Counter</Link>
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Link to="/buttons">Buttons</Link>
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Link to="/jwt">JWT</Link>
      </Button>
    </div>
  );
};

export default Profile;

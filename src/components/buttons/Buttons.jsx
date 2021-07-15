import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react";

const Buttons = () => {
  // To apply styles to material elements
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
  const { i18n } = useLingui();

  return (
    <>
    <span>Current locale: {i18n.locale}</span>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Trans id="Example button Material-UI">Example button Material-UI</Trans>
      </Button>
      <Button variant="contained" disabled className={classes.testButtons}>
        <Trans id="Example №2 disabled">Example №2 disabled</Trans>
      </Button>
      <Button variant="contained" className={classes.testButtons} onClick={() => {i18n.activate("en");}}>
        en
      </Button>
      <Button variant="contained" className={classes.testButtons} onClick={() => {i18n.activate("ru");}}>
        ru
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Link to="/profile">Profile</Link>
      </Button>
    </>
  );
};

export default Buttons;

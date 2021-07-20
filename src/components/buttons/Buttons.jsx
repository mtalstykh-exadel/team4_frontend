import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Trans } from '@lingui/macro';
import { LangService } from "../../utils/lang-service.js";
const ln = new LangService();

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
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Trans>enTest</Trans>
      </Button>
      <Button variant="contained" disabled className={classes.testButtons}>
        <Trans>ruTest</Trans>
      </Button>
      <Button variant="contained" className={classes.testButtons} onClick={() => { ln.saveLang("en"); }}>
        en
      </Button>
      <Button variant="contained" className={classes.testButtons} onClick={() => { ln.saveLang("ru"); }}>
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

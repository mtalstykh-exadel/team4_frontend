import React from "react";
import ReactDOM from 'react-dom';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Trans} from '@lingui/macro';
import {switchLang} from "../../utils/lang-service.js";
import SimpleModal from "../modal-w/Modal.js";

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
      <div id='modal'/>
      <Button
        onClick={() => {
          ReactDOM.render(<SimpleModal/>, document.getElementById('modal'));
        }}
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
      <Button variant="contained" className={classes.testButtons} onClick={() => {
        switchLang("en");
      }}>
        en
      </Button>
      <Button variant="contained" className={classes.testButtons} onClick={() => {
        switchLang("ru");
      }}>
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

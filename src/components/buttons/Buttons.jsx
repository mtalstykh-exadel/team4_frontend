import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles, Modal} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Trans} from '@lingui/macro';
import {switchLang} from "../../utils/lang-service.js";
import PropTypes from 'prop-types';
import '../../styles/modal.scss';

const Buttons = ({children}) => {
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div id='modal'/>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        disableElevation
        className={classes.testButtons}
      >
        <Trans>enTest</Trans>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className='modalMain'>
        <div className='modal'>
          {children}
        </div>
      </Modal>
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

Buttons.propTypes =
  {
    children: PropTypes.array
  };
export default Buttons;

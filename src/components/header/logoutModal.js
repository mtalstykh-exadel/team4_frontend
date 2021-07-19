import { React } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Fade, Button, Backdrop} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { fetchLogout } from '../../store/actions/headerActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  }
}));

const LogoutModal = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Modal
      className='modal'
      BackdropComponent={Backdrop}
      open={Boolean(props.logoutEl)}
      onClose={props.handleAccClose}>
      <Fade in={props.logoutEl}>
        <div className={classes.paper}>
          <h2>Log out of account?</h2>
          <div className='modalBtns'>
            <Button
              color='primary'
              variant='contained'
              onClick={() => {props.handleAccClose(); props.handleLangClose(); dispatch(fetchLogout());}}>
                Yes
            </Button>
            <Button
              color='primary'
              variant='outlined'
              onClick={() => {props.handleLogoutClose(); props.handleAccClose(); props.handleLangClose();}}>
                No
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>);
};

LogoutModal.propTypes = {
  logoutEl: PropTypes.any,
  handleLogoutClose: PropTypes.func,
  handleAccClose: PropTypes.func,
  handleLangClose: PropTypes.func,
};

export default LogoutModal;

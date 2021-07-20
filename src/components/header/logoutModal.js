import { React } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Fade, Button, Backdrop} from '@material-ui/core';

import { fetchLogout } from '../../store/actions/headerActions';

const LogoutModal = (props) => {
  const dispatch = useDispatch();

  return (
    <Modal
      className='base-color'
      BackdropComponent={Backdrop}
      open={Boolean(props.logoutEl)}
      onClose={props.handleAccClose}>
      <Fade in={Boolean(props.logoutEl)}>
        <div className='paper'>
          <h2>Log out of account?</h2>
          <div className='modalBtns'>
            <Button
              className='primary-contained'
              variant='contained'
              onClick={() => {props.handleAccClose(); props.handleLangClose(); dispatch(fetchLogout());}}>
                Yes
            </Button>
            <Button
              className='primary-outlined'
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

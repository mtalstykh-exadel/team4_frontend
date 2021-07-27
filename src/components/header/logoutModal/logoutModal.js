import { React } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Fade, Button, Backdrop} from '@material-ui/core';

import { Trans } from '@lingui/macro';

import { logoutActions } from '../../../store/actions/logoutActions';

const LogoutModal = (props) => {
  const dispatch = useDispatch();

  return (
    <Modal
      className='modal'
      BackdropComponent={Backdrop}
      open={Boolean(props.logoutEl)}
      onClose={props.handleAccClose}>
      <Fade in={Boolean(props.logoutEl)}>
        <div className='paper'>
          <h2><Trans>Log out of account?</Trans></h2>
          <div className='modalBtns'>
            <Button
              color='primary'
              variant='contained'
              onClick={() => {props.handleAccClose(); props.handleLangClose(); dispatch(logoutActions());}}>
              <Trans>Yes</Trans>
            </Button>
            <Button
              color='primary'
              variant='outlined'
              onClick={() => {props.handleLogoutClose(); props.handleAccClose(); props.handleLangClose();}}>
              <Trans>No</Trans>
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

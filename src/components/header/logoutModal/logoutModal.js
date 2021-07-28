import { React } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Modal, Fade, Button, Backdrop} from '@material-ui/core';

import { Trans } from '@lingui/macro';

import { logoutActions } from '../../../store/actions/logoutActions';

const LogoutModal = (props) => {
  const dispatch = useDispatch();
  const darktheme = useSelector((state) => state.darktheme);

  return (
    <Modal
      className={`modal ${darktheme ? 'theme-dark' : 'theme-light'} base-color`}
      BackdropComponent={Backdrop}
      open={Boolean(props.logoutEl)}
      onClose={props.handleAccClose}>
      <Fade in={Boolean(props.logoutEl)}>
        <div className='paper base-color'>
          <h2><Trans>Log out of account?</Trans></h2>
          <div className='modalBtns'>
            <Button
              className='primary-contained'
              variant='contained'
              onClick={() => {props.handleAccClose(); props.handleLangClose(); dispatch(logoutActions());}}>
              <Trans>Yes</Trans>
            </Button>
            <Button
              className='primary-outlined'
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

import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from '@lingui/macro';

import notificationsData from '../data/dummyData';

const Notifications = (props) => {

  const notificationsAssign = (item) => (
    <>
      <Typography variant='body1' className='font-primary'>
        <Trans id='notificationTestAsigned'>A test to determine the level of English has been asigned to your name</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        {item.level}
      </Typography>
      <Button
        disableElevation
        component={Link}
        to='/test'
        color='primary'
        variant='text'
        className='notifications-seemoreBtn font-color'
        onClick={props.handleNotifClose}>
        <Trans>See More</Trans>
      </Button>
    </>
  );

  const notificationsTest = (item) => (
    <>
      <Typography variant='body1' className='font-primary'>
        <Trans id='notificationTestChecked'>Your English language test is checked. Your English level has been set as .</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        {item.level}
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Deadline: </Trans>{item.expiration}
      </Typography>
      <Button
        component={Link}
        to='/test'
        color='primary'
        variant='contained'
        className='notifications-takeTestBtn button-standard'
        onClick={props.handleNotifClose}>
        <Trans>Take test</Trans>
      </Button>
    </>
  );

  const notificationsEmpty = (
    <Typography variant='caption' className='notifications-empty font-primary'>
      <Trans id='notificationsEmpty'>No new notificiations for you</Trans>
    </Typography>
  );

  return (
    <Menu
      className='notifications-dropdown-menu'
      elevation={2}
      anchorEl={props.notifEl}
      open={Boolean(props.notifEl)}
      onClose={props.handleNotifClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      PaperProps={{
        style: {
          width: 350,
        }}}>
      {Object.keys(notificationsData).length !== 0 ? notificationsData.map((item, index) => (
        <div className='notifications-test' key={index}>
          <Typography variant='caption' className='font-primary'>
            {item.date}
          </Typography>
          <Button
            className='closeButton'
            onClick={props.handleNotifClose}>
            <CloseIcon
              size='small'
              className='icons-color'/>
          </Button>
          {item.type === 'result' ? notificationsAssign(item) : notificationsTest(item)}
        </div>)) : notificationsEmpty
      }
    </Menu>);
};

Notifications.propTypes = {
  notifEl: PropTypes.any,
  handleNotifClose: PropTypes.func,
  handleCircle: PropTypes.func,
};

export default Notifications;

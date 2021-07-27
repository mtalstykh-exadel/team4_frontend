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
      <Typography variant='body1'>
        <Trans id='notificationTestAsigned'>A test to determine the level of English has been asigned to your name</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold'>
        {item.level}
      </Typography>
      <Button
        disableElevation
        component={Link}
        to='/test'
        color='primary'
        variant='text'
        className='notifications-seemoreBtn'
        onClick={props.handleNotifClose}>
        <Trans>See More</Trans>
      </Button>
    </>
  );

  const notificationsTest = (item) => (
    <>
      <Typography variant='body1'>
        <Trans id='notificationTestChecked'>Your English language test is checked. Your English level has been set as .</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold'>
        {item.level}
      </Typography>
      <Typography variant='subtitle2' className='bold'>
        {item.expiration}
      </Typography>
      <Button
        component={Link}
        to='/test'
        color='primary'
        variant='contained'
        className='notifications-takeTestBtn'
        onClick={props.handleNotifClose}>
        <Trans>Take test</Trans>
      </Button>
    </>
  );

  const notificationsEmpty = (
    <Typography
      className='notifications-empty'
      variant='caption'>
      <Trans id='notificationsEmpty'>No new notificiations for you</Trans>
    </Typography>
  );

  return (
    <Menu
      elevation={1}
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
          <Typography variant="caption">
            {item.date}
          </Typography>
          <Button
            className='closeButton'
            onClick={props.handleNotifClose}>
            <CloseIcon
              size='small'> </CloseIcon>
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

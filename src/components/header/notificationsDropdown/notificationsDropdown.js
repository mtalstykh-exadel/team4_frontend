import { React } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import notificationsData from '../data/dummyData';

const Notifications = (props) => {
  const darktheme = useSelector((state) => state.darktheme);

  const notificationsAssign = (item) => (
    <>
      <Typography
        variant='body1'
        className='font-primary'>
        {item.body}
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
          See More
      </Button>
    </>
  );

  const notificationsTest = (item) => (
    <>
      <Typography
        className='font-primary'
        variant='body1'>
        {item.body}
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        {item.level}
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        {item.expiration}
      </Typography>
      <Button
        component={Link}
        to='/test'
        color='primary'
        variant='contained'
        className='notifications-takeTestBtn primary-contained'
        onClick={props.handleNotifClose}>
          Take Test
      </Button>
    </>
  );

  const notificationsEmpty = (
    <Typography
      className='notifications-empty font-primary'
      variant='caption'>
      No new notificiations for you
    </Typography>
  );

  return (
    <Menu
      className={`notifications-dropdown-menu ${darktheme ? 'theme-dark' : 'theme-light'} base-color`}
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
          <Typography
            className='font-primary'
            variant="caption">
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

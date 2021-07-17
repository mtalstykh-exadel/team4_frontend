import { React } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './headerStyles';
import notificationsData from './dummyData';

const Notifications = (props) => {
  const classes = useStyles();

  const notifAsign = (item) => (
    <>
      <Typography variant="body1">
        {item.body}
      </Typography>
      <Typography variant="subtitle2" className={classes.bold}>
        {item.level}
      </Typography>
      <Button
        disableElevation
        component={Link}
        to='/test'
        color="primary"
        variant="text"
        className={classes.seemoreBtn}
        onClick={props.handleNotifClose}>
          See More
      </Button>
    </>
  );

  const notifTest = (item) => (
    <>
      <Typography variant="body1">
        {item.body}
      </Typography>
      <Typography variant="subtitle2" className={classes.bold}>
        {item.level}
      </Typography>
      <Typography variant="subtitle2" className={classes.bold}>
        {item.expiration}
      </Typography>
      <Button
        component={Link}
        to='/test'
        color="primary"
        variant="contained"
        className={classes.takeTestBtn}
        onClick={props.handleNotifClose}>
          Take Test
      </Button>
    </>
  );

  const notifEmpty = (
    <Typography
      className={classes.notifEmpty}
      variant='caption'>
      No new notificiations for you
    </Typography>
  );

  return (
    <Menu
      elevation={1}
      anchorEl={props.notifEl}
      className={classes.notifiMenu}
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
        <div className={classes.notifTest} key={index}>
          <Typography variant="caption">
            {item.date}
          </Typography>
          <Button
            className={classes.closeButton}
            onClick={props.handleNotifClose}>
            <CloseIcon
              className={classes.closeIcon}
              size='small'> </CloseIcon>
          </Button>
          {item.type === 'result' ? notifAsign(item) : notifTest(item)}
        </div>)) : notifEmpty
      }
    </Menu>);
};

Notifications.propTypes = {
  notifEl: PropTypes.any,
  handleNotifClose: PropTypes.func,
  handleCircle: PropTypes.func,
};

export default Notifications;

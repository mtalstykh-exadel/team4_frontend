import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import { Menu, Typography, Button, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from '@lingui/macro';

import { requestNotificationsList, removeNotification } from '../../../store/actions/headerActions';

import { startTestById } from '../../../api/start-test';

import { formatDateNotifications, formatDate } from '../../../utils/data-formatter';
import { currentTest, testGrammarUserAnswers, testEassyUserAnswers, testListeningUserAnswers, testSpeakingAnswers } from '../../../constants/localStorageConstants';

import { UserModalWindowBanningTest } from '../../TestsInfo/TestsData/UserModalWindowBanningOfPassingTest/UserModalWindowBanningOfPassingTest';
import { ModalWindowTestCanceled } from '../../TestsInfo/ModalWindowTestCanceled/ModalWindowTestCanceled';

const Notifications = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => dispatch(requestNotificationsList()), []);

  const notifications = useSelector((state) => state.notifications);
  const [openLimit, setOpenLimit] = useState(false);
  const [openDeassigned, setOpenDeassigned] = useState(false);
  const [loading, setLoading] = useState(false);

  const notificationAssigned = (item) => (
    <div>
      <Typography variant='body1' className='font-primary'>
        <Trans id='notificationTestAsigned'>A test to determine the level of English has been asigned to your name</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Level: {item.level}</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Deadline: </Trans>{formatDate(item.deadline)}
      </Typography>
      <Button
        color='primary'
        variant='contained'
        disabled={loading}
        className='notifications-takeTestBtn button-standard'
        onClick={() => {
          setLoading(true);
          localStorage.removeItem(currentTest);
          localStorage.removeItem(testGrammarUserAnswers);
          localStorage.removeItem(testEassyUserAnswers);
          localStorage.removeItem(testListeningUserAnswers);
          localStorage.removeItem(testSpeakingAnswers);
          dispatch(removeNotification(item.id));
          startTestById(item.testId)
            .then((response) => {
              localStorage.setItem(currentTest, JSON.stringify(response));
              history.push('/test');
              window.scrollTo(0, 0);
            })
            .catch((err) => {
              if (err.response.status === 409) {
                setOpenLimit(true);
              } else if (err.response.status === 404) {
                setOpenDeassigned(true);
              }
              setLoading(false);
            });
        }}>
        {loading ? (
          <CircularProgress className='border-primary' size='23px'/>
        ) : (
          <Trans>Take test</Trans>
        )}
      </Button>
    </div>
  );

  const notificationTakeTest = (item) => (
    <div className='notification-result'>
      <Typography variant='body1' className='font-primary'>
        <Trans id='notificationTestChecked'>Your English language test is checked. Your English level has been set as .</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        {item.level}
      </Typography>
      <Button
        disableElevation
        color='primary'
        variant='text'
        className='notifications-seemoreBtn font-color'
        onClick={() => {
          localStorage.setItem(currentTest, JSON.stringify({id: item.testId}));
          history.push('/result');
        }}>
        <Trans>See Results</Trans>
      </Button>
    </div>
  );

  const notificationDeassigned = () => (
    <div>
      <Typography variant='body1' className='font-primary'>
        <Trans>The test was deassigned</Trans>
      </Typography>
    </div>
  );

  const notificationsEmpty = (
    <div>
      <Typography variant='caption' className='notifications-empty font-primary'>
        <Trans id='notificationsEmpty'>No new notificiations for you</Trans>
      </Typography>
    </div>
  );

  const renderNotifications = (item) => {
    switch (item.type) {
      case 'TEST_ASSIGNED':
        return notificationAssigned(item);
      case 'TEST_VERIFIED':
        return notificationTakeTest(item);
      case 'TEST_DEASSIGNED':
        return notificationDeassigned();
    }
  };

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
      {notifications.length === 0 ?
        notificationsEmpty :
        <div>
          {notifications.map((item, index) => (
            <div className='notifications-test' key={index}>
              <Typography variant='caption' className='font-primary'>
                {formatDateNotifications(item.createdAt)}
              </Typography>
              <IconButton
                className='closeButton'
                onClick={() => {props.handleNotifClose; dispatch(removeNotification(item.id));}}>
                <CloseIcon
                  size='small'
                  className='icons-color'/>
              </IconButton>
              {renderNotifications(item)}
            </div>))}
        </div>}
      <ModalWindowTestCanceled open={openDeassigned} handleClose={() => setOpenDeassigned(false)}/>
      <UserModalWindowBanningTest open={openLimit} handleClose={() => setOpenLimit(false)}/>
    </Menu>);
};

Notifications.propTypes = {
  notifEl: PropTypes.any,
  handleNotifClose: PropTypes.func
};

export default Notifications;

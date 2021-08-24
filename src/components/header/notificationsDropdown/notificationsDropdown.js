import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import { Menu, Typography, Button, IconButton, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from '@lingui/macro';

import { requestNotificationsList, removeNotification } from '../../../store/actions/headerActions';
import { requestReports, requestGrades, requestUnverifiedTests } from '../../../store/actions/unverifiedTestActions';

import { startTestById } from '../../../api/start-test';
import { getTest } from '../../../api/get-test';
import { Modal } from '@material-ui/core';

import { formatDateNotifications, formatDate, formatDeadline } from '../../../utils/data-formatter';
import { currentTest, testGrammarUserAnswers, testEassyUserAnswers, testListeningUserAnswers, testSpeakingAnswers, testAudioAttempts } from '../../../constants/localStorageConstants';

import { UserModalWindowBanningTest } from '../../TestsInfo/TestsData/UserModalWindowBanningOfPassingTest/UserModalWindowBanningOfPassingTest';
import { ModalWindowTestCanceled } from '../../TestsInfo/ModalWindowTestCanceled/ModalWindowTestCanceled';
import { TestsForVerificationModal } from '../../TestsForVerificationTable/Component/TestsForVerificationModal';

const Notifications = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => dispatch(requestNotificationsList()), []);

  const notifications = useSelector((state) => state.notifications);
  const [openLimit, setOpenLimit] = useState(false);
  const [openDeassigned, setOpenDeassigned] = useState(false);
  const [loading, setLoading] = useState(null);
  const [openVerify, setOpenVerify] = useState(false);

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
          localStorage.setItem(testAudioAttempts, 3);
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
              setLoading(null);
            });
          dispatch(removeNotification(item.id));
        }}>
        {loading && loading === item.id ? (
          <CircularProgress className='border-primary' size='23px'/>
        ) : (
          <Trans>Take test</Trans>
        )}
      </Button>
    </div>
  );

  const notificationCoachAssigned = (item) => (
    <div>
      <Typography variant='body1' className='font-primary'>
        <Trans>A test for verification has been asigned to your name</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Level: {item.level},  Test ID: {item.testId}</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Priority: </Trans>{item.priority}
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
      </Typography>
      <Button
        color='primary'
        variant='contained'
        className='notifications-takeTestBtn button-standard'
        disabled={loading}
        onClick={() => {
          setLoading(item.id);
          dispatch(requestUnverifiedTests(0, 10))
            .then(() => {
              dispatch(requestReports(item.testId))
                .then(() => dispatch(requestGrades(item.testId)))
                .then(() => Promise.resolve(setOpenVerify(true)))
                .catch((err) => {
                  if (err.response.status === 409) {
                    setOpenDeassigned(true);
                  }})
                .finally(() => setLoading(null));
              dispatch(removeNotification(item.id));});
        }
        }>
        {loading && loading === item.id ? (
          <CircularProgress className='border-primary' size='23px'/>
        ) : (
          <Trans>Verify test</Trans>
        )}
      </Button>
    </div>
  );

  const notificationCoachDeassigned = (item) => (
    <div>
      <Typography variant='body1' className='font-primary'>
        <Trans>You have been deassigned from verification of test</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Level: {item.level},  Test ID: {item.testId}</Trans>
      </Typography>
    </div>
  );

  const notificationTakeTest = (item) => (
    <div className='notification-result'>
      <Typography variant='body1' className='font-primary'>
        <Trans id='notificationTestChecked'>Your English language test is checked.</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Level: {item.level}</Trans>
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

  const notificationStarted = (item) => (
    <div className='notification-result'>
      <Typography variant='body1' className='font-primary'>
        <Trans>You have test in progress</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Level: {item.level}</Trans>
      </Typography>
      <Typography variant='subtitle2' className='bold font-primary'>
        <Trans>Time limit: {formatDeadline(item.createdAt)} - {formatDeadline(item.finishTime)}</Trans>
      </Typography>
      <Button
        disableElevation
        color='primary'
        variant='contained'
        className='notifications-seemoreBtn button-standard'
        disabled={loading}
        onClick={() => {
          setLoading(item.id);
          getTest(item.testId)
            .then((response) => {
              localStorage.setItem(testAudioAttempts, 1);
              localStorage.setItem(currentTest, JSON.stringify(response));
              history.push('/test');
            })
            .catch(() => dispatch(removeNotification(item.id)))
            .finally(() => setLoading(null));
        }}>
        {loading && loading === item.id ? (
          <CircularProgress className='border-primary' size='23px'/>
        ) : (
          <Trans>Continue</Trans>
        )}
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
      case 'COACH_ASSIGNED':
        return notificationCoachAssigned(item);
      case 'COACH_DEASSIGNED':
        return notificationCoachDeassigned(item);
      case 'TEST_STARTED':
        return notificationStarted(item);
      default:
        return '';
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
      <Modal
        open={openVerify}
        onClose={() => setOpenVerify(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <div className='modal-content'>
          {openVerify && <TestsForVerificationModal handleClose={() => setOpenVerify(false)} page={0} rowsPerPage={10}/>}
        </div>
      </Modal>
    </Menu>);
};

Notifications.propTypes = {
  notifEl: PropTypes.any,
  handleNotifClose: PropTypes.func
};

export default Notifications;

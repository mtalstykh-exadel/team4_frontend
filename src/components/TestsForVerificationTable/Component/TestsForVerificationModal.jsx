import React, { useState } from 'react';
import '../../../styles/modal.scss';
import PropTypes from 'prop-types';
import './TestsForVerificationModal.scss';
import { IconButton, Button, TextField, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Player } from '../../index';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';

import { getAudioFile } from '../../../api/get-audioFIle';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { requestReports } from '../../../store/actions/unverifiedTestActions';

export const TestsForVerificationModal = (props) => {
  const [essayGrade, setEssayGrade] = useState(-1);
  const [speakingGrade, setSpeakingGrade] = useState(-1);

  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestReports(props.test.id));
  }, []);

  useEffect(
    async function () {
      setUrl(
        await getAudioFile(props.test.contentFile.url).then((response) => {
          return URL.createObjectURL(
            new Blob([response.data], { type: 'audio/ogg' })
          );
        })
      );
    },
    [setUrl]
  );



  const ReportedMistakes = useSelector((state) => state.reports);

  const ReportedMistakesHTML =
    <div className='reported-mistake-wrapper'>
      <div className='error-messages'><Trans>Error messages from the user:</Trans></div>
      <div className='scroll-container'>
        {
          ReportedMistakes.map((item) => {
            const reportedQuestion = props.test.questions.Listening.find((o) => o.id === item.questionId);
            return (
              <>
                <div className='module-name'><Trans>Module</Trans> <Trans>{item.module}</Trans></div>
                <div className='users-message'>{item.reportBody}</div>
                <div className='question-id'><Trans>Question ID</Trans> {item.questionId}</div>
                <div className='question-context'>{reportedQuestion}</div>
                <div className='edit-button-wrapper'>
                  <Button
                    variant='outlined'
                    color='primary'
                    className='edit-button'
                    component={Link}
                    to='/edit-test-modules'
                  ><Trans>Edit</Trans></Button>
                </div>
                <TextField
                  label='Comment'
                  variant='outlined'
                  className='comment-section'
                  multiline
                  rows={3}
                />
              </>
            );
          })
        }
      </div>
    </div>;
  const EssayHTML =
    <div className='essay-wrapper'>
      <div className='topic-title'><Trans>Topic</Trans></div>
      <div className='topic-text'>{props.test.questions.Essay[0].questionBody}</div>
      <div className='users-essay'>{props.test.questions.Essay[0].answers}</div>
      <div className='grades-wrapper'>
        {
          [0,1,2,3,4,5,6,7,8,9,10].map((item) => {
            return (
              <div key={item} className={essayGrade === item ? 'grade chosen' : 'grade'} onClick={() => {setEssayGrade(item);}}>{item}</div>
            );
          })
        }
      </div>
      <TextField
        label='Comment'
        variant='outlined'
        className='comment-section'
        multiline
        rows={4}
      />
    </div>;
  const SpeakingHTML =
    <div className='speaking-wrapper'>
      <div className='topic-title'><Trans>Topic</Trans></div>
      <div className='topic-text'>{props.test.contentFile.topic}</div>
      <div className='audio'>
        <Player
          id='player-speaking'
          src={url}
        />
      </div>
      <div className='grades-wrapper'>
        {[0,1,2,3,4,5,6,7,8,9,10].map((item) => {
          return (
            <div key={item} className={speakingGrade === item ? 'grade chosen' : 'grade'} onClick={() => {setSpeakingGrade(item);}}>{item}</div>
          );
        })}
      </div>
      <TextField
        label='Comment'
        variant='outlined'
        className='comment-section'
        multiline
        rows={4}
      />
    </div>;

  const steps = [
    ReportedMistakesHTML,
    EssayHTML,
    SpeakingHTML
  ];

  const [step, setStep] = useState(0);

  return (
    <div className='tests-verification-modal'>
      <Paper elevation={2}>
        <div className='tests-verification-modal-header'>
          <div className='test-information'>
            <span className='test-id-verification-modal'><Trans>Test ID</Trans> {props.test.id}</span>
            <span><Trans>Level</Trans> {props.test.level}</span>
          </div>
          <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
            <CloseIcon/>
          </IconButton>
        </div>
        <div className='tests-verification-modal-navigation'>
          <div className={step === 0 ? 'reported-mistake-navigation chosen' : 'reported-mistake-navigation'}
            onClick={() => {setStep(0);}}>
            <div className='navigation-text'>
              <Trans>Reported mistakes</Trans>
            </div>
          </div>
          <div className={step === 1 ? 'essay-navigation chosen' : 'essay-navigation'} onClick={() => {setStep(1);}}>
            <div className='navigation-text'>
              <Trans>Essay</Trans>
            </div>
          </div>
          <div className={step === 2 ? 'speaking-navigation chosen' : 'speaking-navigation'} 
            onClick={() => {setStep(2);}}>
            <div className='navigation-text'>
              <Trans>Speaking</Trans>
            </div>
          </div>
        </div>
        <div className='tests-verification-modal-context'>
          {steps[step]}
        </div>
        <div className='tests-verification-modal-buttons-wrapper'>
          <Button variant='contained' color='primary' className='save-button'><Trans>Save</Trans></Button>
          <Button variant='contained' color='secondary' className='submit-button'><Trans>Submit</Trans></Button>
        </div>
      </Paper>
    </div>
  );
};

TestsForVerificationModal.propTypes = {
  test: PropTypes.object,
  handleClose: PropTypes.func,
};

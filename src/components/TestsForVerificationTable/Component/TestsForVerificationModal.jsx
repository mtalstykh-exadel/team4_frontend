import React, { useState } from 'react';
import '../../../styles/modal.scss';
import PropTypes from 'prop-types';
import './TestsForVerificationModal.scss';
import { IconButton, Button, TextField, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Player } from '../../index';
import { Link } from 'react-router-dom';

export const TestsForVerificationModal = ({id, level, handleClose}) => {
  const [essayGrade, setEssayGrade] = useState(-1);
  const [speakingGrade, setSpeakingGrade] = useState(-1);

  const ReportedMistakes = [
    {
      module: 'Listening',
      message: 'Hello! This question contains an error. The correct answer is not so-and-so, but so-and-so.',
      questionID: 1258454,
      question: 'An obstetrician/gynecologist at the pre-conception clinic suggests we ............. some further tests.'
    },
    {
      module: 'Essay',
      message: 'Hello! This topic contains an error. It is right to write birTHday.',
      questionID: 1908632,
      question: 'Happy birzday to you!'
    }
  ];

  const ReportedMistakesHTML =
    <div className='reported-mistake-wrapper'>
      <div className='error-messages'>Error messages from the user:</div>
      {
        ReportedMistakes.map((item) => {
          return (
            <>
              <div className='module-name'>Module {item.module}</div>
              <div className='users-message'>{item.message}</div>
              <div className='question-id'>Question ID {item.questionID}</div>
              <div className='question-context'>{item.question}</div>
              <div className='edit-button-wrapper'>
                <Button
                  variant='outlined'
                  color='primary'
                  className='edit-button'
                  component={Link}
                  to='/edit-test-modules'
                >Edit</Button>
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
    </div>;
  const EssayHTML =
    <div className='essay-wrapper'>
      <div className='topic-title'>Topic</div>
      <div className='topic-text'>Essay topic</div>
      <div className='users-essay'>User's essay</div>
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
      <div className='topic-title'>Topic</div>
      <div className='topic-text'>Speaking topic</div>
      <div className='audio'>
        <Player
          id='player-speaking'
          src='https://www.signalogic.com/melp/EngSamples/Orig/male.wav'
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
            <span className='test-id-verification-modal'>test ID {id}</span>
            <span>Level {level}</span>
          </div>
          <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
            <CloseIcon/>
          </IconButton>
        </div>
        <div className='tests-verification-modal-navigation'>
          <div className={step === 0 ? 'reported-mistake-navigation chosen' : 'reported-mistake-navigation'} onClick={() => {setStep(0);}}><div className='navigation-text'>Reported mistakes</div></div>
          <div className={step === 1 ? 'essay-navigation chosen' : 'essay-navigation'} onClick={() => {setStep(1);}}><div className='navigation-text'>Essay</div></div>
          <div className={step === 2 ? 'speaking-navigation chosen' : 'speaking-navigation'} onClick={() => {setStep(2);}}><div className='navigation-text'>Speaking</div></div>
        </div>
        <div className='tests-verification-modal-context'>
          {steps[step]}
        </div>
        <div className='tests-verification-modal-buttons-wrapper'>
          <Button variant='contained' color='primary' className='save-button'>Save</Button>
          <Button variant='contained' color='secondary' className='submit-button'>Submit</Button>
        </div>
      </Paper>
    </div>
  );
};

TestsForVerificationModal.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  handleClose: PropTypes.func,
};

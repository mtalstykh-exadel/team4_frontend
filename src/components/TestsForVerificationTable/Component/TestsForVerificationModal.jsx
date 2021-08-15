import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import '../../../styles/modal.scss';
import './TestsForVerificationModal.scss';

import { IconButton, Button, TextField, Paper } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress } from '@material-ui/core';

import { Player } from '../../index';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';

import { getAudioFile } from '../../../api/get-audioFIle';

import { setTestGrades } from '../../../api/unverifiedTests-fetch';
import { requestUnverifiedTests } from '../../../store/actions/unverifiedTestActions';
import { gradeEssay, gradeSpeaking } from '../../../constants/localStorageConstants';

export const TestsForVerificationModal = (props) => {

  const dispatch = useDispatch();

  const [grammar, setGrammar] = useState([]);
  const [loading, setLoading] = useState(false);

  const test = useSelector((state) => state.reports);
  const unverifiedTests = useSelector((state) => state.unverifiedTests);

  const commentEssay = JSON.parse(localStorage.getItem(`${gradeEssay}${test.testId}`));
  const [essay, setEssay] = useState({
    comment: commentEssay !== null ? commentEssay.comment : '',
    grade: commentEssay !== null ? commentEssay.grade : 0,
    questionId: test.essayQuestion.id,
    testId: test.testId
  });

  const commentSpeaking = JSON.parse(localStorage.getItem(`${gradeSpeaking}${test.testId}`));
  const [speaking, setSpeaking] = useState({
    comment: commentSpeaking !== null ? commentSpeaking.comment : '',
    grade: commentSpeaking !== null ? commentSpeaking.grade : 0,
    questionId: test.speakingQuestion.id,
    testId: test.testId
  });

  const handleEssayComment = (event) => {
    setEssay({
      ...essay,
      comment: event.target.value,
    });
  };

  const handleEssayGrade = (grade) => {
    setEssay({
      ...essay,
      grade: grade,
    });
  };

  const handleSpeakingComment = (event) => {
    setSpeaking({
      ...speaking,
      comment: event.target.value,
    });
  };

  const handleSpeakingGrade = (grade) => {
    setSpeaking({
      ...speaking,
      grade: grade,
    });
  };

  const setGrammarReport = (index) => (event) => {
    const newGrammar = grammar;
    newGrammar.push({
      id: index,
      report: event.target.value
    });
    setGrammar(newGrammar);
  };

  const [url, setUrl] = useState('');

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

  const ReportedMistakesHTML =
    <div className='reported-mistake-wrapper'>
      <div className='error-messages'><Trans>Error messages from the user:</Trans></div>
      <div className='scroll-container'>
        {
          test.reportedQuestions.map((item, index) => {
            return (
              <div key={index}>
                <div className='module-name'><Trans>Module</Trans> <Trans>{item.question.module}</Trans></div>
                <div className='users-message'>{item.report}</div>
                <div className='question-id'><Trans>Question ID</Trans> {item.question.id}</div>
                <div className='question-context'>{item.question.questionBody}</div>
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
                  onChange={setGrammarReport(item.question.id)}
                  multiline
                  rows={3}
                />
              </div>
            );
          })
        }
      </div>
    </div>;
  const EssayHTML =
    <div className='essay-wrapper'>
      <div className='topic-title'><Trans>Topic</Trans></div>
      <div className='topic-text'>{test.essayQuestion.questionBody}</div>
      <div className='users-essay'>{test.essayQuestion.answers}</div>
      <div className='grades-wrapper'>
        {
          [0,1,2,3,4,5,6,7,8,9,10].map((item) => {
            return (
              <div key={item} className={essay.grade === item ? 'grade chosen' : 'grade'} onClick={() => {handleEssayGrade(item);}}>{item}</div>
            );
          })
        }
      </div>
      <TextField
        label='Comment'
        variant='outlined'
        value={essay.comment}
        onChange={handleEssayComment}
        className='comment-section'
        multiline
        rows={4}
      />
    </div>;
  const SpeakingHTML =
    <div className='speaking-wrapper'>
      <div className='topic-title'><Trans>Topic</Trans></div>
      <div className='topic-text'>{test.speakingQuestion.questionBody}</div>
      <div className='audio'>
        <Player
          id='player-speaking'
          src={url}
        />
      </div>
      <div className='grades-wrapper'>
        {[0,1,2,3,4,5,6,7,8,9,10].map((item) => {
          return (
            <div key={item} className={speaking.grade === item ? 'grade chosen' : 'grade'} onClick={() => {handleSpeakingGrade(item);}}>{item}</div>
          );
        })}
      </div>
      <TextField
        label='Comment'
        variant='outlined'
        className='comment-section'
        multiline
        value={speaking.comment}
        onChange={handleSpeakingComment}
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
            <span className='test-id-verification-modal'><Trans>Test ID</Trans> {test.testId}</span>
            <span><Trans>Level</Trans> {test.testLevel}</span>
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
          <div className={step === 1 ? 'essay-navigation chosen' : 'essay-navigation'}
            onClick={() => {setStep(1);}}>
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
          <Button variant='contained' color='primary' className='save-button' onClick={ () => {
            dispatch(requestUnverifiedTests());
            step === 1 && localStorage.setItem(`${gradeEssay}${test.testId}`, JSON.stringify(essay));
            step === 2 && localStorage.setItem(`${gradeSpeaking}${test.testId}`, JSON.stringify(speaking));
          }}><Trans>Save</Trans></Button>
          <Button variant='contained' color='secondary' className='submit-button'
            disabled = {loading || JSON.parse(localStorage.getItem(`${gradeEssay}${test.testId}`)) && JSON.parse(localStorage.getItem(`${gradeSpeaking}${test.testId}`)) ? false : true}
            onClick={() => {
              setLoading(true);
              dispatch(requestUnverifiedTests());
              unverifiedTests.find((x) => x.id === test.testId) ?
                setTestGrades(test.testId)
                  .then(() => props.handleClose())
                  .then(() => dispatch(requestUnverifiedTests())) :
                props.handleClose();}}>
            {loading ? (
              <CircularProgress className='border-primary' size='23px'/>
            ) : (
              <Trans>Submit</Trans>
            )}
          </Button>
        </div>
      </Paper>
    </div>
  );
};

TestsForVerificationModal.propTypes = {
  id: PropTypes.number,
  test: PropTypes.any,
  handleClose: PropTypes.func,
};

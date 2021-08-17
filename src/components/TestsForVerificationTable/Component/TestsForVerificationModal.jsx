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

import { submitTestGrades, saveTestGrades } from '../../../api/testsForVerification-fetch';
import { requestUnverifiedTests } from '../../../store/actions/unverifiedTestActions';

export const TestsForVerificationModal = (props) => {

  const dispatch = useDispatch();

  const [grammar, setGrammar] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const test = useSelector((state) => state.unverifiedTest.test);
  const grades = useSelector((state) => state.unverifiedTest.grades);

  const commentEssay = grades.find((grade) => grade.questionId === test.essayQuestion.id);
  const [essay, setEssay] = useState({
    comment: commentEssay ? commentEssay.comment : '',
    grade: commentEssay ? commentEssay.grade : 0,
    questionId: test.essayQuestion.id,
    testId: test.testId
  });

  const commentSpeaking = grades.find((grade) => grade.questionId === test.speakingQuestion.id);
  const [speaking, setSpeaking] = useState({
    comment: commentSpeaking ? commentSpeaking.comment : '',
    grade: commentSpeaking ? commentSpeaking.grade : 0,
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

  const handleSubmit = () => {
    setLoadingSubmit(true);
    dispatch(requestUnverifiedTests())
      .then((response) => {
        if (response.unverifiedTests.find((unverifiedTest) => unverifiedTest.id === test.testId)) {
          saveTestGrades(essay)
            .then(() => saveTestGrades(speaking)
              .then(() => submitTestGrades(test.testId)
                .then(() => props.handleClose())));
        }
      });
  };

  const handleSave = () => {
    setLoadingSave(true);
    step === 1 && saveTestGrades(essay);
    step === 2 && saveTestGrades(speaking);
    dispatch(requestUnverifiedTests())
      .then(() => setLoadingSave(false));
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
        await getAudioFile(test.speakingUrl).then((response) => {
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
          test.reportedQuestions.map((reportedQuestion, index) => {
            return (
              <div key={index}>
                <div className='module-name'><Trans>Module</Trans> <Trans>{reportedQuestion.question.module}</Trans></div>
                <div className='users-message'>{reportedQuestion.report}</div>
                <div className='question-id'><Trans>Question ID</Trans> {reportedQuestion.question.id}</div>
                <div className='question-context'>{reportedQuestion.question.questionBody}</div>
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
                  onChange={setGrammarReport(reportedQuestion.question.id)}
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
      <div className='users-essay'>{test.essayText}</div>
      <div className='grades-wrapper'>
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => {
            return (
              <div key={grade} className={essay.grade === grade ? 'grade chosen' : 'grade'} onClick={() => {handleEssayGrade(grade);}}>{grade}</div>
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
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => {
          return (
            <div
              key={grade}
              className={speaking.grade === grade ? 'grade chosen' : 'grade'}
              onClick={() => {handleSpeakingGrade(grade);}}>
              {grade}
            </div>
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
          <Button
            variant='outlined'
            color='primary'
            className='save-button'
            disabled={loadingSave} onClick={() => handleSave()}>
            {loadingSave ? (
              <CircularProgress className='border-primary' size='23px'/>
            ) : (
              <Trans>Save</Trans>
            )}</Button>
          <Button
            variant='contained'
            color='primary'
            className='submit-button'
            disabled = {loadingSubmit || loadingSave}
            onClick={() => handleSubmit()}>
            {loadingSubmit ? (
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

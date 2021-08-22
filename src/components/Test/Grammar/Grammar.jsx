import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Grammar.scss';
import { Trans } from '@lingui/macro';
import { testController } from '../test-controller';
import { Modal } from '@material-ui/core';
import { ReportAMistakeModal } from '../ReportAMistakeModal/ReportAMistakeModal';
import { saveTestHandler } from '../saveHandler';
import { testGrammarUserAnswers, testListeningUserAnswers } from '../../../constants/localStorageConstants';

export const Grammar = ({ tasks, testModule, reportModule, level, testID, module }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionID, setQuestionID] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const answersData = localStorage.getItem(testModule);

  setTimeout(() => {
    if (answersData !== null) {
      JSON.parse(answersData).map((item) => {
        document.getElementById(item.domID).checked = true;
      });
    }
  }, 0);

  let questionCount = 0;
  const questions = tasks.map((question) => {
    questionCount++;
    const options = question.answers.map((questionItem) => {
      const domID = 'aID-' + questionItem.id + '__qID-' + question.id;
      return (
        <div key={domID} className='test-question-option'> 
          <span onClick={() => {
              testController({
                testModule,
                tasks,
                questionID: question.id,
                answerID: questionItem.id,
                domID,
              });
              saveTestHandler({
                listening: JSON.parse(localStorage.getItem(testListeningUserAnswers)),
                grammar: JSON.parse(localStorage.getItem(testGrammarUserAnswers))
              });
            }
          }>
            <input
              id={domID}
              type='radio'
              name={'group-' + questionCount}
              value={questionItem.answer}
              defaultChecked = {questionItem?.checked === true ? 'checked' : false}
            />
            <label htmlFor={domID} className='question-answer'>
              {' '}
              {questionItem.answer}
            </label>
          </span>
        </div>
      );
    });

    return (
      <div key={questionCount} className='grammar-step'>
        <div className='test-question'>
          <span className='test-question number'>{questionCount}. </span>
          <span className='test-question sentence'>
            {question.questionBody}
          </span>
          <span className='report-mistake' onClick={() => {
            setQuestionText(question.questionBody);
            setQuestionID(question.id);
            handleOpen();
          }}>
            <Trans>Report a mistake</Trans>
          </span>
        </div>
        {options}
      </div>
    );
  });

  return (
    <>
      <div className='step-description grammar'>
        <Trans>Choose the correct option to complete the sentence</Trans>
      </div>
      {questions}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <div className='modal-content base-color'>
          <ReportAMistakeModal
            question={questionText}
            questionId={questionID}
            level={level}
            module={module}
            handleClose={handleClose}
            testId={testID}
            reportModule={reportModule + questionID}
          />
        </div>
      </Modal>
    </>
  );
};

Grammar.propTypes = {
  tasks: PropTypes.array,
  questions: PropTypes.array,
  testModule: PropTypes.string,
  level: PropTypes.string,
  testID: PropTypes.number,
  reportModule: PropTypes.string,
  module: PropTypes.array
};

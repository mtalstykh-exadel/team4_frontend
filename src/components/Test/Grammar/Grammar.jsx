import React from 'react';
import PropTypes from 'prop-types';
import './Grammar.scss';
import { Trans } from '@lingui/macro';
import { testController } from '../test-controller';

export const Grammar = ({ tasks, testModule }) => {
  
  const saveDataArray = localStorage.getItem(testModule);
  setTimeout(() => {
    if (saveDataArray !== null) {
      JSON.parse(saveDataArray).map((item) => {
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
        <div key={questionItem.answer} className='test-question-option'>
          <input
            id={domID}
            type='radio'
            name={'group-' + questionCount}
            value={questionItem.answer}
          />
          <label onClick={() => testController({testModule: testModule, tasks: tasks, questionID: question.id, answerID: questionItem.id, domID: domID})} htmlFor={domID} className='question-answer'> {questionItem.answer}</label>
        </div>
      );
    });

    return (
      <div key={questionCount} className='grammar-step'>
        <div className='test-question'>
          <span className='test-question number'>{questionCount}. </span>
          <span className='test-question sentence'>{question.questionBody}</span>
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
    </>
  );
};

Grammar.propTypes = {
  tasks: PropTypes.array,
  questions: PropTypes.array,
  testModule: PropTypes.string,
};

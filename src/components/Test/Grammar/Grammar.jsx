import React from 'react';
import PropTypes from 'prop-types';
import './Grammar.scss';
import { Trans } from '@lingui/macro';

export const Grammar = ({ tasks }) => {

  let questionCount = 0;
  const questions = tasks.map((question) => {

    questionCount++;
    const options = question.answers.map((questionItem) => {
      return (
        <div key={questionItem.answer} className='test-question-option'>
          <input
            id={questionItem.answer + questionCount}
            type='radio'
            name={'group-' + questionCount}
            value={questionItem.answer}
          />
          <label htmlFor={questionItem.answer + questionCount}> {questionItem.answer}</label>
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
};

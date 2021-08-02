import React from 'react';
import PropTypes from 'prop-types';
import './Grammar.scss';
import { Trans } from '@lingui/macro';

const Grammar = ({ tasks }) => {

  let questionCount = 0;
  const questions = tasks.map((question) => {

    questionCount++;
    const options = question.options.map((questionItem) => {
      return (
        <div key={questionItem.option} className='test-question-option'>
          <input
            type='radio'
            name={'group-' + questionCount}
            value={questionItem.option}
          />
          <label> {questionItem.option}</label>
        </div>
      );
    });

    return (
      <div key={questionCount} className='grammar-step'>
        <div className='test-question'>
          <span className='test-question number'>{questionCount}. </span>
          <span className='test-question sentence'>{question.sentence}</span>
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

export default Grammar;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

import './ManageGrammar.scss';

export const ManageGrammar = (props) => {

  const [question, setQuestion] = useState(props.moduleData);

  useEffect(() => {
    props.handleModule(question);
  }, [question]);

  useEffect(() => {
    if (!question.level && !question.module) {
      setQuestion(Object.assign({}, question, {
        level: props.level,
        module: 'Grammar'
      }));
    }
  }, []);

  const handleSentence = (event) => {
    setQuestion(Object.assign({}, question, {
      questionBody: event.target.value
    }));
  };

  const handleRadio = (event) => {
    const optionsArray = [...question.answers];

    optionsArray[event.target.value].correct = true;
    setQuestion(Object.assign({}, question, {
      answers: optionsArray
    }));
  };

  const handleAnswersChange = (index) => (event) => {
    const optionsArray = [...question.answers];
    optionsArray[index].answer = event.target.value;
    setQuestion(Object.assign({}, question, {
      answers: optionsArray
    }));
  };

  return (
    <div className='manage-grammar'>
      <TextField
        required
        fullWidth
        onChange={handleSentence}
        id='outlined-required'
        name='questionName'
        placeholder={`${props.questionIndex ? props.questionIndex + '.' : ''} Question`}
        value={question.questionBody}
        variant='outlined'
      />
      {question.answers.map((values, index) => {
        return (
          <div className='manage-option' key={index}>
            <input
              className='manage-radio'
              type='radio'
              required
              name={`answerIndex${props.questionIndex}`}
              value={index}
              checked={values.correct ? 'checked' : null}
              onChange={handleRadio} />
            <TextField
              required
              placeholder='Answer'
              value={values.answer}
              onChange={handleAnswersChange(index)} />
          </div>);
      })}
    </div>
  );
};

ManageGrammar.propTypes = {
  handleModule: PropTypes.func,
  questionIndex: PropTypes.any,
  moduleData: PropTypes.any,
  level: PropTypes.any
};

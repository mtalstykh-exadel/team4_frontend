import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import './ManageGrammar.scss';

export const ManageGrammar = (props) => {

  const [question, setQuestion] = useState(cloneDeep(props.moduleData));

  useEffect(() => {
    if (question.questionBody) {
      let isReady = false;
      question.answers.map((el) => {
        el.answer
          ? el.correct ? isReady = true : null
          : isReady = false;
      });
      if (isReady) {
        props.handleReady(true);
      } else {
        props.handleReady(false);
      }
    } else {
      props.handleReady(false);
    }
    props.handleModule(question);
    console.log(question);
  }, [question]);

  useEffect(() => {
    if (!question.level && !question.module) {
      if (props.module) {
        setQuestion(Object.assign({}, question, {
          level: props.level,
          module: props.module
        }));
      } else {
        setQuestion(Object.assign({}, question, {
          level: props.level,
          module: 'Grammar'
        }));
      }
    }
  }, []);

  const handleSentence = (event) => {
    setQuestion(Object.assign({}, question, {
      questionBody: event.target.value
    }));
  };

  const handleRadio = (event) => {
    const optionsArray = [...question.answers];
    optionsArray.map((el) => el.correct = false);
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
        disabled={props.dataType}
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
              disabled={props.dataType}
              name={`answerIndex${props.questionIndex}`}
              value={index}
              checked={values.correct ? 'checked' : null}
              onChange={handleRadio} />
            <TextField
              required
              disabled={props.dataType}
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
  handleReady: PropTypes.func,
  questionIndex: PropTypes.any,
  moduleData: PropTypes.any,
  dataType: PropTypes.any,
  level: PropTypes.any,
  module: PropTypes.any
};

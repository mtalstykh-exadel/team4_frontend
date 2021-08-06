import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

import './ManageGrammars.scss';

export const ManageGrammar = (props) => {

  const [question, setQuestion] = useState(props.moduleData);

  useEffect(() => {props.handleModule(question);}, [question]);

  const handleSentence = (event) => {
    setQuestion(Object.assign({}, question, {
      sentence: event.target.value}));
  };

  const handleRadio = (event) => {
    setQuestion(Object.assign({}, question, {
      radiovalue: event.target.value}));
  };

  const handleAnswersChange = (index) => (event) => {
    const optionsArray = [...question.options];
    optionsArray[index].option = event.target.value;
    setQuestion(Object.assign({}, question, {
      options: optionsArray}));
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
        value={question.sentence}
        variant='outlined'
      />
      {question.options.map((values , index) => {
        return (
          <div className='manage-option' key={index}>
            <input
              className='manage-radio'
              type='radio'
              required
              name={`answerIndex${props.questionIndex}`}
              value={index}
              checked={+question.radiovalue === index && question.radiovalue !== '' ? 'checked' : null}
              onChange={handleRadio}/>
            <TextField
              placeholder='Answer'
              value={values.option}
              onChange={handleAnswersChange(index)}/>
          </div>);
      })}
    </div>
  );
};

ManageGrammar.propTypes = {
  handleModule: PropTypes.func,
  questionIndex: PropTypes.any,
  moduleData: PropTypes.any
};

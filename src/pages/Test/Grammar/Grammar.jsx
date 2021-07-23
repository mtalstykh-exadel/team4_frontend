import React from "react";
import PropTypes from 'prop-types';
import './Grammar.scss';

const Grammar = ({ tasks }) => {
  let numberOfTheQuestion = 0;
  const questions = tasks.map((item1) => {
    numberOfTheQuestion++;
    const options = item1.options.map((item2) => {
      return (
        <div key={item2.option} className='option'>
          <input type="radio" name={'group-' + numberOfTheQuestion} value={item2.option}/>
            <label> {item2.option}</label>
        </div>);
    });
    return (
      <div key={numberOfTheQuestion}>
        <div className='question'>
          <span className='question number'>{numberOfTheQuestion}. </span>
          <span className='question sentence'>{item1.sentence}</span>
        </div>
        {options}
      </div>
    );
  });
  return (
    <>
      <div className='step-description'>Choose the correct option to complete the sentence</div>
      {questions}
    </>
);
};

Grammar.propTypes = {
  tasks: PropTypes.array,
  questions: PropTypes.array
};

export default Grammar;

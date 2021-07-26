import React from "react";
import PropTypes from "prop-types";
import "./Grammar.scss";

const Grammar = ({ tasks }) => {
  let questionCount = 0;

  const questions = tasks.map((question) => {
    questionCount++;
    const options = question.options.map((questionItem) => {
      return (
        <div key={questionItem.option} className="option">
          <input
            type="radio"
            name={"group-" + questionCount}
            value={questionItem.option}
          />
          <label> {questionItem.option}</label>
        </div>
      );
    });
    return (
      <div key={questionCount}>
        <div className="question">
          <span className="question number">{questionCount}. </span>
          <span className="question sentence">{question.sentence}</span>
        </div>
        {options}
      </div>
    );
  });
  return (
    <>
      <div className="step-description grammar">
        Choose the correct option to complete the sentence
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

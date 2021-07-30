import React from "react";
import PropTypes from "prop-types";
import "./Grammar.scss";

export const Grammar = ({ tasks }) => {

  let questionCount = 0;
  const questions = tasks.map((question) => {

    questionCount++;
    const options = question.options.map((questionItem) => {
      return (
        <div key={questionItem.option} className="test-question-option">
          <input
            id={questionItem.option + questionCount}
            type="radio"
            name={"group-" + questionCount}
            value={questionItem.option}
          />
          <label htmlFor={questionItem.option + questionCount}> {questionItem.option}</label>
        </div>
      );
    });

    return (
      <div key={questionCount} className="grammar-step">
        <div className="test-question">
          <span className="test-question number">{questionCount}. </span>
          <span className="test-question sentence">{question.sentence}</span>
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

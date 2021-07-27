import React, { useState } from "react";
import "./Test.scss";
import Layout from "../../components/Layout/Layout";
import Speaking from "./Speaking/Speaking";
import Essay from "./Essay/Essay";
import Grammar from "./Grammar/Grammar";
import Listening from "./Listening/Listening";
import Button from "@material-ui/core/Button";
import grammarTasks from "../../testData/GrammarTasks";
import listeningTasks from "../../testData/ListeningTasks";
import { testTimerHandler } from "../../services/test-timer.js";

const Test = () => {
  const minutes = 40;
  const [step, setStep] = useState(0);
  const [nextButtonText, setNextButtonText] = useState("Next step");
  const [prevButtonClass, setPrevButtonClass] = useState(
    "previous-step-button invisible"
  );

  const steps = [
    <Grammar key="0" tasks={grammarTasks} />,
    <Listening key="1" tasks={listeningTasks} />,
    <Essay key="2" />,
    <Speaking key="3" />,
  ];

  window.onload = function() {
    testTimerHandler(minutes);
  };

  return (
    <Layout>
      <div className="test-navigation-wrapper">
        <div
          className={step === 0 ? "test-step active" : "test-step"}
          onClick={() => {
            setStep(0);
            setNextButtonText("Next step");
            setPrevButtonClass("previous-step-button invisible");
          }}
        >
          Grammar
        </div>
        <div
          className={step === 1 ? "test-step active" : "test-step"}
          onClick={() => {
            setStep(1);
            setNextButtonText("Next step");
            setPrevButtonClass("previous-step-button");
          }}
        >
          Listening
        </div>
        <div
          className={step === 2 ? "test-step active" : "test-step"}
          onClick={() => {
            setStep(2);
            setNextButtonText("Next step");
            setPrevButtonClass("previous-step-button");
          }}
        >
          Essay
        </div>
        <div
          className={step === 3 ? "test-step active" : "test-step"}
          onClick={() => {
            setStep(3);
            setNextButtonText("Submit");
            setPrevButtonClass("previous-step-button");
          }}
        >
          Speaking
        </div>
        <div className="test-step time" id="test-timer">{minutes}:00</div>
      </div>
      <div className="test-task-wrapper">{steps[step]}</div>
      <div className="buttons-wrapper">
        <div className="test-buttons">
          <Button
            className={prevButtonClass}
            color="primary"
            variant="outlined"
            onClick={() => {
              setStep((prev) => {
                if (prev > 0) {
                  prev--;
                }
                if (prev === 0) {
                  setPrevButtonClass("previous-step-button invisible");
                }
                setNextButtonText("Next step");
                return prev;
              });
            }}
          >
            Previous step
          </Button>
          <Button
            className="next-step-button"
            color="primary"
            variant="contained"
            onClick={() => {
              setStep((next) => {
                if (next < 3) {
                  next++;
                }
                if (next === 3) {
                  setNextButtonText("Submit");
                }
                setPrevButtonClass("previous-step-button");
                return next;
              });
            }}
          >
            {nextButtonText}
          </Button>
        </div>
        <div className="report-mistake">Report a mistake</div>
      </div>
    </Layout>
  );
};

export default Test;

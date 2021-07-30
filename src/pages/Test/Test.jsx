import React, { useState, useEffect } from "react";
import {
  Speaking,
  Essay,
  Grammar,
  Listening,
  grammarTasks,
  listeningTasks,
} from "../../components";
import { startTimer, createTimer } from "../../services/timer";
import Layout from "../../components/Layout/Layout";
import Button from "@material-ui/core/Button";
import "./Test.scss";

export const Test = () => {
  const TestDurationInminutes = 40;
  const [step, setStep] = useState(0);
  const [nextButtonText, setNextButtonText] = useState("Next");
  const [prevButtonClass, setPrevButtonClass] = useState(
    "previous-step-button invisible"
  );

  const steps = [
    <Grammar key="0" tasks={grammarTasks} />,
    <Listening key="1" tasks={listeningTasks} />,
    <Essay key="2" />,
    <Speaking key="3" />,
  ];

  useEffect(() => {
    startTimer(
      createTimer({
        domId: "test-timer",
        minutes: TestDurationInminutes,
      })
    );
  }, [TestDurationInminutes]);

  return (
    <Layout>
      <div className="test-page">
        <div className="test-navigation-wrapper">
          <div
            className={step === 0 ? "test-step active" : "test-step"}
            onClick={() => {
              setStep(0);
              setNextButtonText("Next");
              setPrevButtonClass("previous-step-button invisible");
            }}
          >
            Grammar
          </div>
          <div
            className={step === 1 ? "test-step active" : "test-step"}
            onClick={() => {
              setStep(1);
              setNextButtonText("Next");
              setPrevButtonClass("previous-step-button");
            }}
          >
            Listening
          </div>
          <div
            className={step === 2 ? "test-step active" : "test-step"}
            onClick={() => {
              setStep(2);
              setNextButtonText("Next");
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
          <div className="test-step time" id="test-timer">
            {TestDurationInminutes}:00
          </div>
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
                  setNextButtonText("Next");
                  return prev;
                });
              }}
            >
              Previous
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
      </div>
    </Layout>
  );
};

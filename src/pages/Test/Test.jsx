import React, { useState } from "react";
import './Test.scss';
import Layout from "../../components/layout/Layout";
import Speaking from "./Speaking/Speaking";
import Essay from "./Essay/Essay";
import Grammar from "./Grammar/Grammar";
import Listening from "./Listening/Listening";
import Button from '@material-ui/core/Button';
import grammarTasks from "../../testData/GrammarTasks";
import listeningTasks from "../../testData/ListeningTasks";

const Test = () => {
  const [step, setStep] = useState(0);
  const [nextButtonText, setNextButtonText] = useState('Next step');
  const steps = [<Grammar key='0' tasks={grammarTasks}/>, <Listening key='1' tasks={listeningTasks}/>, <Essay key='2' />, <Speaking key='3' />];

    return (
      <Layout>
        <div className='test-navigation-wrapper'>
          <div className='test-step' onClick={() => {setStep(0); setNextButtonText('Next step');}}>Grammar</div>
          <div className='test-step' onClick={() => {setStep(1); setNextButtonText('Next step');}}>Listening</div>
          <div className='test-step' onClick={() => {setStep(2); setNextButtonText('Next step');}}>Essay</div>
          <div className='test-step' onClick={() => {setStep(3); setNextButtonText('Submit');}}>Speaking</div>
          <div className='test-step time'>Time</div>
        </div>
        <div className='test-task-wrapper'>{steps[step]}</div>
        <div className='buttons-wrapper'>
          <div className='test-buttons'>
            <Button className='previous-step-button' color='primary' variant='outlined'
                    onClick={
                        () => {setStep((prev) => {
                          setNextButtonText('Next step');
                          if (prev > 0) {
                            return prev - 1;
                          }
                          return prev;
                        });
                      }
                    }>Previous step</Button>
            <Button className='next-step-button' color='primary' variant='contained'
                    onClick={
                        () => {setStep((next) => {
                          setNextButtonText('Submit');
                          if (next < 3) {
                            return next + 1;
                          }
                          return next;
                        });
                      }
                    }>{nextButtonText}</Button>
          </div>
          <div className='report-mistake'>Report a mistake</div>
        </div>
      </Layout>
    );
};

export default Test;

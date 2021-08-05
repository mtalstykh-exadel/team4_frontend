import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import './ResultTest.scss';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const Results = () => {
  const [resultQuote, setResultQuote] = useState(<>
    <p>Your level of English knowledge will be confirmed after checking by the coach.</p>
    <p>You will receive a message in your personal account and by e-mail.</p>
  </>);

  const [result, setResult] = useState(['0', '7', 'waiting', 'waiting']);

  const stepTest = ['Grammar', 'Listening', 'Essay', 'Speaking'].map((step, key) => {
    return (
      <div key={key}>{step}</div>
    );
  });

  const level = 'A2 (Pre-Intermediate)';

  const statusChange = () => {
    setResultQuote(
      <>
        <p>You have passed the English language test at the {level} level.</p>
        <TextField
          className='essay-input'
          variant='outlined'
          multiline
          rows={3}
        />
        <TextField
          className='essay-input'
          variant='outlined'
          multiline
          rows={3}
        />
      </>
    );
  };

  const setStyle = (number) => {
    if (number === 'waiting') return {backgroundColor: '#e2e9f9', border: '5px solid #e2e9f9'};
    else if (number === '10') return {backgroundColor: '#21965333', border: '5px solid #219653'};
    else if (number === '0') return {backgroundColor: '#eb575733', border: '5px solid #eb575733',};
    else if ( number >= '1' && number <= '5') {
      if (number <= '3') {
        return {
          backgroundColor: '#eb575733',
          border: '5px solid #eb575733',
          borderRight: '5px solid #eb5757'
        };
      }
      return {
        backgroundColor: '#eb575733',
        border: '5px solid #eb575733',
        borderRight: '5px solid #eb5757',
        borderBottom: '5px solid #eb5757'
      };
    } else if (number > '5' && number <= '9') {
      return ({
        backgroundColor: '#21965333',
        border: '5px solid #21965333',
        borderLeft: '5px solid #219653',
        borderBottom: '5px solid #219653',
        borderRight: '5px solid #219653',
      });
    }
  };

  const bodyResult = [...result].map((number, key) => {
    let children = number;
    if (number !== 'waiting') children = children + '/10';
    return (
      <div key={key} className='res' style={setStyle(number)}>
        <p className='result'>{children}</p>
      </div>
    );
  });


  return (
    <Layout>
      <Button className='btn' onClick={() => {
        statusChange();
        setResult(result.splice(0,2).concat(['7','4']));
      }
      }>Checked</Button>
      <div className='wrapper1'>
        English Language Proficiency Test results
      </div>
      <div className='wrapper2'>
        {bodyResult}
      </div>
      <div className='array'> {stepTest}</div>
      <div className='wrapper3'> {resultQuote}</div>
    </Layout>
  );
};

export default Results;

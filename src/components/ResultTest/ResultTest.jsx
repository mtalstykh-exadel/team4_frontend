import React, {useState} from 'react';
import Layout from '../Layout/Layout';
import './ResultTest.scss';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';

const Results = () => {
  const [resultQuote, setResultQuote] = useState(<>
    <p>Your level of English knowledge will be confirmed after checking by the coach.</p>
    <p>You will receive a message in your personal account and by e-mail.</p>
  </>);

  const [result, setResult] = useState(['waiting','waiting']);

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


  const example1 = [5, 8].map((number, key) => {
    return (
      <div key={key++} className='sum' style={{backgroundColor: number <= 5 ? '#EB575733' : '#21965333'}}><p
        className='result'>{number}/10</p>
      </div>
    );
  });

  const example2 = [result[0], result[1]].map((number, key) => {
    return (
      <div key={key--} className='sum' style={{backgroundColor: number <= '5/10' ? '#EB575733' : '#21965333'}}><p
        className='result'>{number}</p>
      </div>
    );
  });
  return (
    <Layout>
      <Button className='btn' onClick={() => {
        statusChange();
        setResult(['8/10','5/10']);
      }
      }>Checked</Button>
      <div className='wrapper1'>
        English Language Proficiency Test results
      </div>
      <div className='wrapper2'>
        {example1}
        {example2}
      </div>
      <div className='wrapper3'> {resultQuote}</div>
    </Layout>
  );
};

export default Results;

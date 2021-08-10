import React, {useState} from 'react';
import Layout from '../Layout/Layout';
import './ResultTest.scss';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import PropTypes from 'prop-types';

const Results = ({level}) => {
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

  const setStyle = (res) => {
    if (res === 'waiting') return 'res-waiting';
    else if (res === '0') return 'res-null';
    else if (res === '10') return 'res-ten';
    else if (res >= '1' && res <= '5') {
      if (res < '5') return 'res-red-under-five';
      return 'res-red-five';
    } else if (res > '5' && res <= '9') {
      return 'res-blue-upper-five';
    }
  };

  const bodyResult = [...result].map((res, key) => {
    if (res !== 'waiting') res = res + '/10';
    return (
      <div key={key} className={setStyle(res)}>
        <p className='result'>{res}</p>
      </div>
    );
  });


  return (
    <Layout>
      <Button className='btn' onClick={() => {
        statusChange();
        setResult(result.splice(0, 2).concat(['7', '5']));
      }
      }>Checked</Button>
      <div className='result-header'>
        English Language Proficiency Test results
      </div>
      <div className='result-body'>
        {bodyResult}
      </div>
      <div className='step-test'> {stepTest}</div>
      <div className='result-quote'> {resultQuote}</div>
    </Layout>
  );
};

Results.propTypes = {
  level: PropTypes.string,
};

export default Results;

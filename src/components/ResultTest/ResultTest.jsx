import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import './ResultTest.scss';
import PropTypes from 'prop-types';
import { getResultTest } from '../../api/result-test';
import { getTest } from '../../api/get-test';
import { Trans } from '@lingui/macro';


const Results = ({idTest}) => {
  const [result, setResult] = useState();
  const [test, setTest] = useState(0);

  useEffect(async function () {
    setTest(await getTest(idTest).then((res) => res));
    setResult(await getResultTest(idTest).then((res) => res));
  });

  let resultQuote =
    [<><p>Your level of English knowledge will be confirmed after checking by the coach.</p><p>You will receive a message in your personal account and by e-mail</p></>,
     <><p>Ваш уровень знания английского будет подтвержден после проверки тренером.</p><p>Вы получите сообщение в личном кабинете и на электронную почту.</p></>
    ];

  const headerQuote = [
    'English Language Proficiency Test results',
    'Результаты теста на знание английского языка'
  ];

  const stepTest = [
    {en: 'Grammar', ru: 'Грамматика'},
    {en: 'Listening', ru: 'Прослушивание'},
    {en: 'Essay', ru: 'Эссе'},
    {en: 'Speaking', ru: 'Говорение'}].map((step, key) => {
    return (
      <div key={key}><Trans>{step.en}{step.ru}</Trans></div>
    );
  });

  const level = test.level;
  const statusChange = () => {
    resultQuote = [
      'You have passed the English language test at the ' + level.toString() + ' level.',
      'Вы сдали тест по английскому языку на уровне ' + level.toString()
    ];
  };

  const setStyle = (res) => {
    if (res === 'waiting') return 'res-waiting';
    else if (res === 0) return 'res-null';
    else if (res === 10) return 'res-ten';
    else if (res >= 1 && res <= 5) {
      if (res < 5) return 'res-red-under-five';
      return 'res-red-five';
    } else if (res > 5 && res <= 9) {
      return 'res-blue-upper-five';
    }
  };

  const arrayResult = [];

  if (result !== undefined) {
    arrayResult[0] = (result.grammar);
    arrayResult[1] = (result.listening);
    arrayResult[2] = (result.essay);
    arrayResult[3] = (result.speaking);
  }

  const htmlResultGrammarAndListening = [...arrayResult].splice(0, 2).map((res, key) => {
    return (
      <div key={key} className={setStyle(res)}>
        <p className='result'>{res}/10</p>
      </div>
    );
  });

  const htmlResultEssayAndSpeaking = [...arrayResult].splice(2, 2).map((res, key) => {
    let htmlRes = ['waiting', 'ожидать'];
    if (test.status === 'COMPLETED') {
      htmlRes = <Trans>{htmlRes[0]}{htmlRes[1]}</Trans>;
      res = 'waiting';
    } else if (test.status === 'VERIFIED') htmlRes = res.toString() + '/10';
    return (
      <div key={key} className={setStyle(res)}>
        <p className='result'>{htmlRes}</p>
      </div>
    );
  });

  if (test.status === 'VERIFIED') {
    statusChange();
  }

  return (
    <Layout>
      <div className='result-header'>
        <Trans>{headerQuote[0]}{headerQuote[1]}</Trans>
      </div>
      <div className='result-body'>
        {htmlResultGrammarAndListening}
        {htmlResultEssayAndSpeaking}
      </div>
      <div className='step-test'> {stepTest} </div>
      <div className='result-quote'>
        <Trans>{resultQuote[0]}{resultQuote[1]}</Trans>
      </div>
    </Layout>
  );
};

Results.propTypes =
  {
    idTest: PropTypes.number,
  };

export default Results;

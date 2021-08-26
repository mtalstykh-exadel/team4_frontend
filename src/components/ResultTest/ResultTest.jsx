import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { getResultTest } from '@api/result-test';
import Layout from '../Layout/Layout';
import './ResultTest.scss';
import { Trans } from '@lingui/macro';
import { currentTest } from '@constants/localStorageConstants';

const Results = () => {
  const [result, setResult] = useState();
  const [test, setTest] = useState(0);
  const [loading, setLoading] = useState(false);

  const getResults = async () => {
    setLoading(true);
    let idTest;
    try {
      idTest = JSON.parse(localStorage.getItem(currentTest)).id;
    } catch (e) {
      window.location.href = '/';
    }

    if (test === 0) {
      await getResultTest(idTest).then((res) => setTest(res));
    }

    if (result === undefined) {
      await getResultTest(idTest).then((res) => setResult(res));
    }
    setLoading(false);
  };

  useEffect(() => {
    getResults();
  });

  let resultQuote = [
    <>
      <p>
        Your level of English knowledge will be confirmed after checking by the
        coach.
      </p>
      <p>You will receive a message in your personal account and by e-mail</p>
      <p
        onClick={() => (window.location.href = './profile')}
        className='go-back'
      >
        Go back to your personal account
      </p>
    </>,
    <>
      <p>
        Ваш уровень знания английского будет подтвержден после проверки
        тренером.
      </p>
      <p>Вы получите сообщение в личном кабинете и на электронную почту.</p>
      <p
        onClick={() => (window.location.href = './profile')}
        className='go-back'
      >
        Вернуться на свой аккаунт
      </p>
    </>,
  ];

  const headerQuote = [
    'English Language Proficiency Test results',
    'Результаты теста на знание английского языка',
  ];

  const stepTest = [
    { en: 'Grammar', ru: 'Грамматика' },
    { en: 'Listening', ru: 'Аудирование' },
    { en: 'Essay', ru: 'Эссе' },
    { en: 'Speaking', ru: 'Говорение' },
  ].map((step, key) => {
    return (
      <div key={key}>
        <Trans>
          {step.en}
          {step.ru}
        </Trans>
      </div>
    );
  });

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
    arrayResult[0] = result.grammar;
    arrayResult[1] = result.listening;
    arrayResult[2] = result.essay;
    arrayResult[3] = result.speaking;
  }

  if (test.status === 'VERIFIED') {
    const level = test.level;
    const essayComments = test.essayComment;
    const speakingComments = test.speakingComment;

    resultQuote = [
      <>
        <p>
          You have passed the English language test at the {level.toString()}{' '}
          level.
        </p>
        <div className={'comments'}>
          <div className={'module-text'}>Module Essay</div>
          <div className={'answer'}>{essayComments}</div>
        </div>
        <div className={'comments'}>
          <div className={'module-text'}>Module Speaking</div>
          <div className={'answer'}>{speakingComments}</div>
        </div>
        <p
          onClick={() => (window.location.href = './profile')}
          className='go-back-full-test'
        >
          Go back to your personal account
        </p>
      </>,
      <>
        <p>Вы сдали тест по английскому языку на уровне {level.toString()}</p>
        <div className={'comments'}>
          <div className={'module-text'}>Модуль Эссе</div>
          <div className={'answer'}>{essayComments}</div>
        </div>
        <div className={'comments'}>
          <div className={'module-text'}>Модуль Говорения</div>
          <div className={'answer'}>{speakingComments}</div>
        </div>
        <p
          onClick={() => (window.location.href = './profile')}
          className='go-back-full-test'
        >
          Вернуться на свой аккаунт
        </p>
      </>,
    ];
  }

  return (
    <Layout>
      <div className='result-header'>
        <Trans>
          {headerQuote[0]}
          {headerQuote[1]}
        </Trans>
      </div>
      {loading ? (
        <CircularProgress className='border-primary' />
      ) : (
        <>
          <div className='result-body'>
            {[...arrayResult].splice(0, 2).map((res, key) => {
              return (
                <div key={key} className='result-item-wrapper'>
                  <div className={setStyle(res)}>
                    <p className='result'>{res}/10</p>
                  </div>
                  {stepTest[key]}
                </div>
              );
            })}
            {[...arrayResult].splice(2, 2).map((res, key) => {
              let htmlRes = ['waiting', 'ожидать'];
              if (test.status === 'COMPLETED') {
                htmlRes = (
                  <Trans>
                    {htmlRes[0]}
                    {htmlRes[1]}
                  </Trans>
                );
                res = 'waiting';
              } else {
                htmlRes = res.toString() + '/10';
              }
              return (
                <div key={key} className='result-item-wrapper'>
                  <div className={setStyle(res)}>
                    <p className='result'>{htmlRes}</p>
                  </div>
                  {stepTest[key + 2]}
                </div>
              );
            })}
          </div>
          <div className='result-quote'>
            <Trans>
              {resultQuote[0]}
              {resultQuote[1]}
            </Trans>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Results;

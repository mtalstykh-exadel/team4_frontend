import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../../components/Layout/Layout';
import { EditTestsFilter, EditTestsTable } from '../../components';
import imageSrc from '../../assets/images/goose.svg';
import './EditTests.scss';
import { Trans } from '@lingui/macro';

export const EditTests = () => {
  const [module, setModule] = useState(null);
  const [level, setLevel] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [status, setStatus] = useState(null);

  const role = useSelector((state) => state.jwt.role);
  if (role !== 'ROLE_COACH') return <Redirect to='/' />;
  return (
    <Layout pageWrapperClass='edit-tests-selector'>
      <EditTestsFilter setModule={setModule} setLevel={setLevel} setQuestionId={setQuestionId} setStatus={setStatus}/>
      {

        (level || questionId) && module
          ? <EditTestsTable module={module} questionId={questionId} level={level} status={status}/>
          : <div className='edit-tests-placeholder'>
            <div className='edit-tests-selector-text'><Trans>Select the option at the top to see the questions.</Trans></div>
            <img title='goose-img' alt='goose-img' src={imageSrc} className='picture' />
          </div>
      }
    </Layout>
  );
};

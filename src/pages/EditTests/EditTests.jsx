import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import Layout from '../../components/Layout/Layout';
import { EditTestsFilter, EditTestsTable } from '../../components';
import imageSrc from '../../assets/images/goose.svg';
import './EditTests.scss';
import { Trans } from '@lingui/macro';

export const EditTests = () => {
  const [level, setLevel] = useState(null);
  const [module, setModule] = useState(null);
  const [questionId, setQuestionId] = useState(null);

  const role = useSelector((state) => state.jwt.role);
  if (role !== 'ROLE_COACH') return <Redirect to='/' />;
  return (
    <Layout pageWrapperClass='edit-tests-selector'>
      <EditTestsFilter questionId={questionId} setLevel={setLevel} setModule={setModule}
        setQuestionId={setQuestionId} />
      {
        (level && module) || questionId
          ? <EditTestsTable level={level} module={module} questionId={questionId} />
          : <div className='edit-tests-placeholder'>
            <div className='edit-tests-selector-text'><Trans>Select the option at the top to see the questions.</Trans></div>
            <img title='goose-img' alt='goose-img' src={imageSrc} className='picture' />
          </div>
      }
    </Layout>
  );
};



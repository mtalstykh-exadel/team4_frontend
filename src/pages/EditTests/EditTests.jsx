import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { EditTestsFilter, EditTestsTable } from '../../components';
import imageSrc from '../../assets/images/goose.svg';
import './EditTests.scss';

export const EditTests = () => {
  const [level, setLevel] = useState(null);
  const [module, setModule] = useState(null);
  const [questId, setQuestId] = useState(null);

  return (
    <Layout pageWrapperClass='edit-tests-selector'>
      <EditTestsFilter setLevel={setLevel} setModule={setModule} setQuestId={setQuestId} />
      {
        level || module || questId
          ? <EditTestsTable level={level} module={module} questId={questId} />
          : <div className='edit-tests-placeholder'>
            <div className='edit-tests-selector-text'>Select the option at the top to see the questions.</div>
            <img title='goose-img' alt='goose-img' src={imageSrc} className='picture' />
          </div>
      }
    </Layout>
  );
};

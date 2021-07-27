import React, { useState } from 'react';
import EditTestsInfo from './EditTestsInfo/EditTestsInfo';
import imageSrc from '../../assets/images/goose.svg';
import EditTestsData from '../EditTestsSelector/EditTestsData/EditTestsData';
import './EditTestsSelector.scss';

const EditTestsSelector = () => {

  const [level, setLevel] = useState(null);
  const [module, setModule] = useState(null);
  const [questId, setQuestId] = useState(null);

  return (
    <div className='edit-tests-selector'>
      <EditTestsInfo setLevel={setLevel} setModule={setModule} setQuestId={setQuestId} />
      {
        level || module || questId
          ? <EditTestsData level={level} module={module} questId={questId} />
          : <div className='edit-tests-placeholder'>
            <div className='edit-tests-selector-text'>Select the option at the top to see the questions.</div>
            <img title='goose-img' alt='goose-img' src={imageSrc} className='picture' />
          </div>
      }



    </div>
  );
};

export default EditTestsSelector;

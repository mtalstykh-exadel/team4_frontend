import React from 'react';
import EditTestsInfo from './EeditTestsInfo/EditTestsInfo';
import imageSrc from '../../assets/images/goose.svg';
import './EditTestsSelector.scss';


const EditTestsSelector = () => {
  return (
    <div className='edit-tests-selector'>
      <div>
        <EditTestsInfo />
      </div>
      <div className='edit-tests-placeholder'>
        <div className='edit-tests-selector-text'>Select the option at the top to see the questions.</div>
        <img title='goose-img' alt='goose-img' src={imageSrc} className='picture' />
      </div>
    </div>

  );
};

export default EditTestsSelector;

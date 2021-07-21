import React from 'react';
import { Button } from '@material-ui/core';
import './EditTestsData.scss';

const EditTestsData = () => {
  return (
    <div className='edit-tests-data-wrapper'>
      <Button color="primary" variant="contained" type="search" className='btn-add-question'>Add question</Button>
    </div>
  );
};

export default EditTestsData;

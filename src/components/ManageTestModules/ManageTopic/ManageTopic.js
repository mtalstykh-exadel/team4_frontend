import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

export const ManageTopic = (props) => {

  const [moduleData, setModuleData] = useState(props.moduleData);

  const handleField = (event) => {
    setModuleData(event.target.value);
  };

  useEffect(() => {props.handleModule(moduleData);}, [moduleData]);

  return (
    <>
      <p>{props.moduleDescription}</p>
      <TextField
        className='listening-topic'
        required
        size='small'
        value={moduleData.questionBody}
        onChange={handleField}
        id='outlined-required'
        name='questionName'
        label='Topic'
        placeholder='Topic'
        variant='outlined'
      />
    </>
  );
};

ManageTopic.propTypes = {
  handleModule: PropTypes.func,
  moduleData: PropTypes.any,
  moduleDescription: PropTypes.string
};

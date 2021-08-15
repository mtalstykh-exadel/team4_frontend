import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

export const ManageTopic = (props) => {

  const [moduleData, setModuleData] = useState(props.moduleData);

  const handleField = (event) => {
    setModuleData(Object.assign({}, moduleData, {
      questionBody: event.target.value
    }));
  };

  useEffect(() => {
    if (!moduleData.level && !moduleData.module && typeof(moduleData) !== 'string') {
      setModuleData(Object.assign({}, moduleData, {
        level: props.level,
        module: props.module
      }));
    }
  }, []);
  useEffect(() => { props.handleModule(moduleData); }, [moduleData]);
  debugger;
  return (
    <>
      <p>{props.moduleDescription}</p>
      <TextField
        className='listening-topic'
        required
        size='small'
        value={moduleData.questionBody ? moduleData.questionBody : moduleData}
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
  module: PropTypes.any,
  level: PropTypes.any,
  moduleDescription: PropTypes.string
};

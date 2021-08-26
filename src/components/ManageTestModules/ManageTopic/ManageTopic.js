import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

export const ManageTopic = (props) => {

  const [moduleData, setModuleData] = useState(props.moduleData);

  const handleField = (event) => {
    if (typeof (moduleData) === 'string') {
      setModuleData(event.target.value);
    } else {
      setModuleData(Object.assign({}, moduleData, {
        questionBody: event.target.value
      }));
    }
  };

  useEffect(() => {
    if (!moduleData.level && !moduleData.module && typeof (moduleData) !== 'string') {
      setModuleData(Object.assign({}, moduleData, {
        level: props.level,
        module: props.module
      }));
    }

    if (moduleData.answers) {
      const newObj = moduleData;
      delete newObj.answers;
      setModuleData(newObj);
    }
  }, []);

  useEffect(() => {
    if (typeof (moduleData) === 'string' && moduleData) {
      props.handleReady(true);
    } else if (moduleData.questionBody) {
      props.handleReady(true);
    } else {
      props.handleReady(false);
    }

    props.handleModule(moduleData);

  }, [moduleData]);

  return (
    <>
      <p>{props.moduleDescription}</p>
      <TextField
        className='listening-topic'
        required
        disabled={props.dataType}
        size='small'
        value={typeof (moduleData) === 'object' ? moduleData.questionBody : moduleData}
        onChange={handleField}
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
  handleReady: PropTypes.func,
  moduleData: PropTypes.any,
  module: PropTypes.any,
  dataType: PropTypes.any,
  level: PropTypes.any,
  moduleDescription: PropTypes.any
};

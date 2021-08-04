import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modal.scss';
import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import './ReportAMistakeModal.scss';
import CloseIcon from '@material-ui/icons/Close';

export const ReportAMistakeModal = ({ tasks, topic, level, module, handleClose }) => {
  let count = 0;
  let HTMLCodeForStep;
  if (module === 'Grammar' || module === 'Listening') {
    HTMLCodeForStep =
      <>
        <div className='selector-wrapper'>
          <FormControl variant='outlined' className='question-selector'>
            <InputLabel id='questions-selector-label'>Select a question to report</InputLabel>
            <Select labelId='questions-selector-label' label='Select a question to report' id='select'>
              {tasks.map((item, index) => {
                count++;
                return <MenuItem key={count} value={index}>{count}. {item.sentence}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className='add-question-to-report'>Add question</div>
      </>;
  } else {
    HTMLCodeForStep = <div className='topic-wrapper'><div className='topic'>{topic}</div></div>;
  }

  return (
    <div className='report-mistake-modal'>
      <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
        <CloseIcon className='close-icon'/>
      </IconButton>
      <div className='report-header'>Report a mistake</div>
      <div className='level-module-info'>
        <span className='level-info'>Level: {level}</span>
        <span className='module0'>Module: {module}</span>
      </div>
      {HTMLCodeForStep}
      <div className='report-textfield-wrapper'>
        <TextField
          className='report-textfield'
          variant='outlined'
          multiline
          rows={5}
          label='Enter your report'
        />
      </div>
      <div className='report-mistake-buttons-wrapper'>
        <Button className='delete-button' color='primary' variant='outlined'>Delete</Button>
        <Button className='report-button' color='primary' variant='contained'>Report</Button>
      </div>
    </div>
  );
};

ReportAMistakeModal.propTypes = {
  tasks: PropTypes.array,
  topic: PropTypes.string,
  level: PropTypes.string,
  module: PropTypes.string,
  handleClose: PropTypes.func
};

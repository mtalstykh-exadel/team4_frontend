import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modal.scss';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

export const ListeningReportMistake = ({tasks, level}) => {
  let count = 0;

  return (
    <div className='report-mistake-modal'>
      <div className='report-header'>Report a mistake</div>
      <div className='level-module-info'>
        <span className='level-info'>Level: {level}</span>
        <span className='module0'>Module: Listening</span>
      </div>
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
      <div className='report-textfield-wrapper'>
        <TextField
          className='report-textfield'
          variant='outlined'
          multiline
          rows={4}
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

ListeningReportMistake.propTypes = {
  tasks: PropTypes.array,
  level: PropTypes.string,
};

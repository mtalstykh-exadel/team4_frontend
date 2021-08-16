import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modal.scss';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import './ReportAMistakeModal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Trans } from '@lingui/macro';

export const ReportAMistakeModal = ({ tasks, topic, level, module, handleClose }) => {
  let HTMLCodeForStep;

  if (module[0] === 'Grammar' || module[0] === 'Listening') {
    let count = 0;
    const selectorHTML =
      <div className='selector-wrapper'>
        <FormControl variant='outlined' className='question-selector'>
          <InputLabel id='questions-selector-label'><Trans>Select a question to report</Trans></InputLabel>
          <Select labelId='questions-selector-label' label='Select a question to report' id='select'>
            {tasks.map((item, index) => {
              count++;
              return <MenuItem key={count} value={index}>{count}. {item.questionBody}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <div className='report-textfield-wrapper'>
          <TextField
            className='report-textfield'
            variant='outlined'
            multiline
            rows={5}
            label='Enter your report'
          />
        </div>
      </div>;

    const [selector, setSelector] = useState([selectorHTML]);

    const addSelector = () => {
      setSelector(selector.concat(selectorHTML));
    };

    HTMLCodeForStep =
      <div className={selector.length >= 3 ? 'scroll-container visible' : 'scroll-container'}>
        {selector}
        <div
          className={selector.length === tasks.length ? 'add-question-to-report invisible' : 'add-question-to-report'}
          onClick={addSelector}
        ><Trans>Add question</Trans></div>
      </div>;
  } else {
    HTMLCodeForStep =
      <>
        <div className='topic-wrapper'>
          <div className='topic'>{topic[0].questionBody}</div>
        </div>
        <div className='report-textfield-wrapper'>
          <TextField
            className='report-textfield'
            variant='outlined'
            multiline
            rows={5}
            label='Enter your report'
          />
        </div>
      </>;
  }

  return (
    <div className='report-mistake-modal'>
      <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
        <CloseIcon className='close-icon icons-color'/>
      </IconButton>

      <div className='report-header'><Trans>Report a mistake</Trans></div>
      <div className='level-module-info'>
        <span className='level-info'><Trans>Level</Trans>: {level}</span>
        <span className='module'><Trans>Module</Trans>: <Trans>{module[0]}{module[1]}</Trans></span>
      </div>
      {HTMLCodeForStep}
      <div className='report-mistake-buttons-wrapper'>
        <Button className='delete-button' color='primary' variant='outlined'><Trans>Delete</Trans></Button>
        <Button className='report-button' color='primary' variant='contained'><Trans>Report</Trans></Button>
      </div>
    </div>
  );
};

ReportAMistakeModal.propTypes = {
  tasks: PropTypes.array,
  topic: PropTypes.array,
  level: PropTypes.string,
  module: PropTypes.array,
  handleClose: PropTypes.func
};

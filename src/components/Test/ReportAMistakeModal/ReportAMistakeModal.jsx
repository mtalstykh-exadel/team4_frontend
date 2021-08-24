import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '@globalStyles/modal.scss';
import {Button, TextField} from '@material-ui/core';
import './ReportAMistakeModal.scss';
import {Trans} from '@lingui/macro';
import {errorReport, deleteReport} from '@api/mistake-reports';

export const ReportAMistakeModal = ({question, questionId, level, module, handleClose, testId, reportModule}) => {
  const saveDataArray = localStorage.getItem(reportModule);
  const [characters, setCharacters] = useState('');

  const handleChange = (event) => {
    localStorage.setItem(
      reportModule,
      JSON.stringify({
        questionId,
        reportBody: event.target.value,
        testId,
      })
    );
    setCharacters(event.target.value);
  };

  setTimeout(() => {
    if (saveDataArray !== null) {
      setCharacters(JSON.parse(saveDataArray).reportBody);
    }
  }, 0);

  return (
    <div className='report-mistake-modal'>
      <div className='report-header'><Trans>Report a mistake</Trans></div>
      <div className='level-module-info'>
        <span className='level-info'><Trans>Level</Trans>: {level}</span>
        <span className='module'><Trans>Module</Trans>: <Trans>{module[0]}{module[1]}</Trans></span>
      </div>
      <div className='topic-wrapper'>
        <div className='topic'>{question}</div>
      </div>
      <div className='report-textfield-wrapper'>
        <TextField
          className='report-textfield'
          variant='outlined'
          multiline
          rows={5}
          label={<Trans>Enter your report</Trans>}
          value={characters}
          onChange={handleChange}
        />
      </div>
      <div className='report-mistake-buttons-wrapper'>
        <Button
          className='delete-button'
          color='primary'
          variant='outlined'
          disabled={characters === ''}
          onClick={() => {
            if (JSON.parse(saveDataArray) !== null) {
              deleteReport(questionId, testId);
              localStorage.removeItem(reportModule);
              handleClose();
            }
          }}
        >
          <Trans>Delete</Trans>
        </Button>
        <Button
          className='report-button'
          color='primary'
          variant='contained'
          onClick={() => {
            if (JSON.parse(saveDataArray) !== null) {
              errorReport(JSON.parse(saveDataArray));
              handleClose();
            }
          }}
        >
          <Trans>Report</Trans>
        </Button>
      </div>
    </div>
  );
};

ReportAMistakeModal.propTypes = {
  question: PropTypes.string,
  questionId: PropTypes.number,
  level: PropTypes.string,
  module: PropTypes.array,
  handleClose: PropTypes.func,
  testId: PropTypes.number,
  reportModule: PropTypes.string
};

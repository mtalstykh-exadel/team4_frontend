import React, { useState } from 'react';
import './Essay.scss';
import {Modal, TextField} from '@material-ui/core';
import { Trans } from '@lingui/macro';
import PropTypes from 'prop-types';
import { ReportAMistakeModal } from '../ReportAMistakeModal/ReportAMistakeModal';
import { saveEssayHandler } from '../saveHandler';
import { testEassyUserAnswers } from '../../../constants/localStorageConstants';

export const Essay = ({ task, testModule, level, testID, reportModule }) => {
  const saveDataArray = localStorage.getItem(testModule);
  const [characters, setCharacters] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    localStorage.setItem(
      testModule,
      JSON.stringify({ answer: event.target.value })
    );
    setCharacters(event.target.value);
    saveEssayHandler({
      essay: JSON.parse(localStorage.getItem(testEassyUserAnswers))
    });
  };

  setTimeout(() => {
    if (saveDataArray !== null) {
      setCharacters(JSON.parse(saveDataArray).answer);
    }
  }, 0);

  return (
    <div className='essay-step'>
      <div className='step-description'>
        <Trans>Write an essay on a given topic</Trans>
      </div>
      <div className='essay-topic'>{task[0].questionBody}</div>
      <div className='report-mistake' onClick={handleOpen}>
        <Trans>Report a mistake</Trans>
      </div>
      <TextField
        onPaste={(event) => {
          event.preventDefault();
          return false;
        }}
        onCopy={(event) => {
          event.preventDefault();
          return false;
        }}
        onCut={(event) => {
          event.preventDefault();
          return false;
        }}
        className='essay-input'
        variant='outlined'
        multiline
        rows={10}
        value={characters}
        onChange={handleChange}
        inputProps={{ maxLength: 512 }}
      />
      <div className='essay-characters'>
        {characters.length} <Trans>out of 512 characters</Trans>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='modal'>
        <div className='modal-content base-color'>
          <ReportAMistakeModal
            question={task[0].questionBody}
            questionId={task[0].id}
            level={level}
            module={['Essay', 'Эссе']}
            handleClose={handleClose}
            testId={testID}
            reportModule={reportModule}
          />
        </div>
      </Modal>
    </div>
  );
};

Essay.propTypes = {
  task: PropTypes.array,
  testModule: PropTypes.string,
  level: PropTypes.string,
  testID: PropTypes.number,
  reportModule: PropTypes.string
};

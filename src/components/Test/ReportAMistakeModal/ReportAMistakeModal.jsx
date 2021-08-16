import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/modal.scss';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import './ReportAMistakeModal.scss';
import CloseIcon from '@material-ui/icons/Close';
import { Trans } from '@lingui/macro';
import { errorReport, deleteReport } from '../../../api/mistake-reports';

const SelectorHTML = ({ tasks, index, reportModule }) => {
  const saveDataArray = localStorage.getItem(reportModule);
  const [select, setSelect] = useState('');
  const [characters, setCharacters] = useState('');
  const localeStorageArray = saveDataArray !== null ? JSON.parse(saveDataArray) : [];

  setTimeout(() => {
    if (saveDataArray !== null && JSON.parse(saveDataArray).length > index) {
      setSelect(localeStorageArray[index].select);
      setCharacters(localeStorageArray[index].textarea);
    }
  }, 0);


  const handleSelect = (event) => {
    setSelect(event.target.value);
    if (localeStorageArray.length > 0 && localeStorageArray[index]) {
      localeStorageArray[index].select = event.target.value;
    } else {
      localeStorageArray.push(
        {
          questionID: tasks[event.target.value].id,
          select: event.target.value,
          textarea: characters
        }
      );
    }
    localStorage.setItem(
      reportModule,
      JSON.stringify(localeStorageArray)
    );
  };

  const handleInput = (event) => {
    setCharacters(event.target.value);
    if (localeStorageArray.length > 0 && localeStorageArray[index]) {
      localeStorageArray[index].textarea = event.target.value;
    } else {
      localeStorageArray.push(
        {
          questionID: tasks[select].id,
          select,
          textarea: event.target.value
        }
      );
    }
    localStorage.setItem(
      reportModule,
      JSON.stringify(localeStorageArray)
    );
  };

  return (
    <div className='selector-wrapper'>
      <FormControl variant='outlined' className='question-selector'>
        <InputLabel id='questions-selector-label'><Trans>Select a question to report</Trans></InputLabel>
        <Select
          labelId='questions-selector-label'
          label='Select a question to report'
          value={select}
          onChange={handleSelect}>
          {tasks.map((item, index) => {
            return <MenuItem key={index} value={index}>{index + 1}. {item.questionBody}</MenuItem>;
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
          value={characters}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

SelectorHTML.propTypes = {
  tasks: PropTypes.array,
  index: PropTypes.number,
  reportModule: PropTypes.string
};

export const ReportAMistakeModal = ({ tasks, topic, level, module, handleClose, testID, reportModule }) => {
  let HTMLCodeForStep;
  const saveDataArray = localStorage.getItem(reportModule);
  const [characters, setCharacters] = useState('');

  if (module[0] === 'Grammar' || module[0] === 'Listening') {
    const tmpSelector = [];
    if (JSON.parse(saveDataArray) === null) {
      tmpSelector.push(<SelectorHTML key={0} tasks={tasks} index={0} reportModule={reportModule}/>);
    } else {
      for (let i = 0; i < JSON.parse(saveDataArray).length; i++) {
        tmpSelector.push(<SelectorHTML key={i} tasks={tasks} index={i} reportModule={reportModule}/>);
      }
    }

    const [selector, setSelector] = useState(tmpSelector);

    const addSelector = () => {
      setSelector(selector.concat(<SelectorHTML key={selector.length} tasks={tasks} index={selector.length} reportModule={reportModule}/>));
    };

    const deleteSelector = () => {
      setSelector(selector.slice(0,-1));
    };

    HTMLCodeForStep =
      <div className={selector.length >= 3 ? 'scroll-container visible' : 'scroll-container'}>
        {selector}
        <div className={'add-delete-question'}>
          <div className={selector.length === tasks.length ? 'add-question-to-report invisible' : 'add-question-to-report'} onClick={addSelector}><Trans>Add question</Trans></div>
          <div className={selector.length === 1 ? 'delete-question-to-report invisible' : 'delete-question-to-report'} onClick={deleteSelector}><Trans>Delete question</Trans></div>
        </div>
      </div>;
  } else {
    const handleChange = (event) => {
      localStorage.setItem(
        reportModule,
        JSON.stringify({
          questionId: topic[0].id,
          reportBody: event.target.value,
          testId: testID
        })
      );
      setCharacters(event.target.value);
    };

    setTimeout(() => {
      if (saveDataArray !== null) {
        setCharacters(JSON.parse(saveDataArray).reportBody);
      }
    }, 0);

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
            value={characters}
            onChange={handleChange}
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
        <Button
          className='delete-button'
          color='primary'
          variant='outlined'
          onClick={() => {
            if (JSON.parse(saveDataArray) !== null) {
              if (module[0] === 'Essay' || module[0] === 'Speaking') {
                deleteReport(JSON.parse(saveDataArray).questionId, JSON.parse(saveDataArray).testId);
              } else {
                JSON.parse(saveDataArray).map((item) => {
                  deleteReport(item.questionId, item.testId);
                });
              }
              handleClose();
              setCharacters('');
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
              if (module[0] === 'Essay' || module[0] === 'Speaking') {
                errorReport(JSON.parse(saveDataArray));
              } else {
                JSON.parse(saveDataArray).map((item) => {
                  errorReport({
                    questionId: item.questionID,
                    reportBody: item.textarea,
                    testId: testID
                  });
                });
              }
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
  tasks: PropTypes.array,
  topic: PropTypes.array,
  level: PropTypes.string,
  module: PropTypes.array,
  handleClose: PropTypes.func,
  testID: PropTypes.number,
  reportModule: PropTypes.string
};

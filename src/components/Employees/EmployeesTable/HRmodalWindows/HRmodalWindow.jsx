import React from 'react';
import '../../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import PropTypes from 'prop-types';
import './HRmodalWindow.scss';
import Button from '@material-ui/core/Button';

export const HRmodalWindow = ({name, handleClose}) => {

  const englishLevel = ['Beginner(A1)', 'Elementary(A2)', 'Intermediate(B1)', 'Upper Intermediate(B2)', 'Advanced(C1)', 'Proficiency(C2)'];
  const priority = ['low', 'high'];

  let itemKey = 0;
  const modalBody = <>
    <div className='assign-level'>You want to assign a test for {name}</div>
    <div className='test-level-selector-wrapper'>
      <FormControl variant='outlined' className='level-selector'>
        <InputLabel id='test-level-selector-label'>Select the test level:</InputLabel>
        <Select labelId='test-level-selector-label' label='Select the test level' id='select'>
          {englishLevel.map((item, index) => {
            itemKey++;
            return <MenuItem key={itemKey} value={index}> {item}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
    <div className='deadline-priority'>
      <div className='deadline'>
        <h1 className='test-deadline'>Test deadline:</h1>
        <input type='date' id='day'/>
      </div>

      <div className='priority-selector-wrapper'>
        <h1 className='priority'>Priority:</h1>
        <FormControl variant='outlined' className='priority-selector'>
          <InputLabel id='priority-selector-label'/>
          <Select labelId='priority-selector-label' label='Select priority' id='select' className='sel' >
            {priority.map((item, index) => {
              itemKey++;
              return <MenuItem key={itemKey} value={index} className='sel'> {item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
    <Button variant='contained' color='primary' onClick={handleClose}>Assign</Button>
  </>;


  return (
    <div className='hr-modal'>
      <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
        <CloseIcon className='close-icon'/>
      </IconButton>
      {modalBody}
    </div>);
};

HRmodalWindow.propTypes =
  {
    name: PropTypes.string,
    handleClose: PropTypes.func
  };

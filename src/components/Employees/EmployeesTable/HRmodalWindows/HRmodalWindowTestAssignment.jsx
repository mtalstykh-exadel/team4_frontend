import React from 'react';
import '../../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import PropTypes from 'prop-types';
import './HRmodalWindowTestAssignment.scss';
import Button from '@material-ui/core/Button';
import {englishLevel,priority} from './constans/constans';
import { Trans } from '@lingui/macro';

export const HRmodalWindowTestAssignment = ({name, handleClose}) => {

  let itemKey = 0;
  const modalBody =
  <>
    <div className='assign-level'><Trans>You want to assign a test for {name}</Trans></div>
    <div className='test-level-selector-wrapper'>
      <FormControl variant='outlined' className='level-selector'>
        <InputLabel id='test-level-selector-label'><Trans>Select the test level:</Trans></InputLabel>
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
        <h1 className='test-deadline'><Trans>Test deadline:</Trans></h1>
        <input сlassName='base-color font-primary' type='date' id='day'/>
      </div>
      <div className='priority-selector-wrapper'>
        <h1 className='priority'><Trans>Priority:</Trans></h1>
        <FormControl variant='outlined' className='priority-selector'>
          <InputLabel id='priority-selector-label'/>
          <Select labelId='priority-selector-label' label='Select priority' id='select' className='item' >
            {priority.map((item, index) => {
              itemKey++;
              return <MenuItem key={itemKey} value={index} className='item'> {item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
    <Button variant='contained' color='primary' onClick={handleClose}><Trans>Assign</Trans></Button>
  </>;


  return (
    <div className='hr-modal'>
      <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
        <CloseIcon className='close-icon icons-color'/>
      </IconButton>
      {modalBody}
    </div>);
};

HRmodalWindowTestAssignment.propTypes =
  {
    name: PropTypes.string,
    handleClose: PropTypes.func
  };

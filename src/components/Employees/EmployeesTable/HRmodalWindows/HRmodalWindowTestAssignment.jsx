import React from 'react';
import PropTypes from 'prop-types';

import {IconButton, FormControl, InputLabel, MenuItem, Select, Modal, Backdrop, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from '@lingui/macro';

import '../../../../styles/modal.scss';
import './HRmodalWindowTestAssignment.scss';

import { filterLevelsLong, priority } from '../../../../constants/filterConstants';

export const HRmodalWindowTestAssignment = (props) => {

  let itemKey = 0;
  const modalBody =
    <>
      <div className='assign-level'><Trans>You want to assign a test for {props.name}</Trans></div>
      <div className='level-selector-wrapper'>
        <p className='setting-label bold'><Trans>Select the test level:</Trans></p>
        <FormControl variant='outlined' className='level-selector' size='small'>
          <InputLabel id='test-level-selector-label'><Trans>Level</Trans></InputLabel>
          <Select labelId='test-level-selector-label' label='Select the test level' id='select' className='item'>
            {filterLevelsLong.map((item, index) => {
              itemKey++;
              return <MenuItem key={itemKey} value={index}> {item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='settings-wrapper'>
        <div className='setting'>
          <p className='setting-label bold'><Trans>Test deadline:</Trans></p>
          <input сlassName='base-color font-primary' type='date' id='day'/>
        </div>
        <div className='setting'>
          <p className='setting-label bold'><Trans>Priority:</Trans></p>
          <FormControl variant='outlined' className='setting-select' size='small'>
            <InputLabel id='select-label'>Priority</InputLabel>
            <Select labelId='select-label' label='Select priority' id='select'>
              {priority.map((item, index) => {
                itemKey++;
                return <MenuItem key={itemKey} value={index} className='item'> {item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <Button className='assign-button button-standard' variant='contained' color='primary' onClick={props.handleClose}><Trans>Assign</Trans></Button>
    </>;


  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      BackdropComponent={Backdrop}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='modal'>
      <div className='modal-content base-color'>
        <div className='hr-modal'>
          <IconButton aria-label='close' onClick={props.handleClose} className='close-icon-wrapper'>
            <CloseIcon className='close-icon icons-color'/>
          </IconButton>
          {modalBody}
        </div>
      </div>
    </Modal>);
};

HRmodalWindowTestAssignment.propTypes =
  {
    open: PropTypes.bool,
    name: PropTypes.string,
    handleClose: PropTypes.func
  };

import React from 'react';
import '../../../styles/modal.scss';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import PropTypes from 'prop-types';


export const HRmodalWindows = ({key, name, email, handleClose}) => {

  const [modalBody, setModalBody] = React.useState(<></>);
  const englishLevel = ['Beginner(A1)', 'Elementary(A2)', 'Intermediate(B1)', 'Upper Intermediate(B2)', 'Advanced(C1)', 'Proficiency(C2)'];
  const priority = ['low', 'hight'];

   if (key == 0) {
    let itemKey = 0;
    setModalBody(
      <>
        <div className='assign-level'>You want to assign a test for {name}</div>
        <div className='selector-wrapper'>
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
        <div className='deadline'>
          <h1 className='test-deadline'>Test deadline:</h1>
          <input type='date' id='day'/>
        </div>
        <div className='choose-priority'>
          <h1>Priority:</h1>
          <FormControl variant='outlined' className='priority-selector'>
            <InputLabel id='priority-selector-label'>Select priority:</InputLabel>
            <Select labelId='priority-selector-label' label='Select priority' id='select'>
              {priority.map((item, index) => {
                itemKey++;
                return <MenuItem key={itemKey} value={index}> {item}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </>
    );
  } else {
    setModalBody(<h1>okay {email}</h1>);
  }


  return (
    <div className='hr-modal'>
      <IconButton aria-label='close' onClick={handleClose} className='close-icon-wrapper'>
        <CloseIcon className='close-icon'/>
      </IconButton>
      {modalBody}
    </div>);
};

HRmodalWindows.propTypes =
  {
    key: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    handleClose: PropTypes.func
  };

import React from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Modal,
  Backdrop,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Trans } from '@lingui/macro';

import { assignTest } from '../../../../api/employees-fetch';
import { useDispatch } from 'react-redux';

import '../../../../styles/modal.scss';
import './HRmodalWindowTestAssignment.scss';

import { filterLevelsLong, priority } from '../../../../constants/filterConstants';
import { requestEmployeesList } from '../../../../store/actions/employeesActions';

import { useFormik } from 'formik';

export const HRmodalWindowTestAssignment = (props) => {

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues: {date: '', module: '', priority: ''},
    validationSchema: null, onSubmit
  });

  let itemKey = 0;
  const modalBody =
    <form onSubmit={() => {
      assignTest(props.test.id, formik.values)
        .catch((err) => {
          if (err.response.status === 409) {
            props.setOpenCantAssign();
          }}
        )
        .then(() => dispatch(requestEmployeesList(props.page, props.rowsPerPage)));
      props.handleClose();}}>
      <div className='assign-level'><Trans>You want to assign a test for {props.test.name}</Trans></div>
      <div className='level-selector-wrapper'>
        <p className='setting-label bold'><Trans>Select the test level:</Trans></p>
        <FormControl required variant='outlined' className='level-selector' size='small'>
          <InputLabel id='test-level-selector-label'><Trans>Level</Trans></InputLabel>
          <Select
            labelId='test-level-selector-label'
            label='Select the test level'
            id='select'
            value={formik.values.module}
            inputProps={{ name: 'module' }}
            className='item'
            onChange={formik.handleChange}>
            {filterLevelsLong.map((item) => {
              itemKey++;
              return <MenuItem key={itemKey} value={item}><Trans>{item[0]}{item[1]}</Trans></MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className='settings-wrapper'>
        <div className='setting'>
          <p className='setting-label bold'><Trans>Test deadline:</Trans></p>
          <TextField
            required
            className='settings-date icons-color'
            id='datetime-local'
            type='datetime-local'
            variant='outlined'
            size='small'
            defaultValue={formik.values.date}
            onChange={formik.handleChange}
          />
        </div>
        <div className='setting'>
          <p className='setting-label bold'><Trans>Priority: </Trans></p>
          <FormControl required variant='outlined' className='setting-select' size='small'>
            <InputLabel id='select-label'><Trans>Priority</Trans></InputLabel>
            <Select labelId='select-label' label='Select priority' id='select' value={formik.values.priority} inputProps={{ name: 'priority'}}
              onChange={formik.handleChange}>
              {priority.map((item) => {
                itemKey++;
                return <MenuItem key={itemKey} value={item[0]} className='item'><Trans>{item[0]}{item[1]}</Trans></MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <Button
        className='assign-button button-standard'
        variant='contained'
        color='primary'
        type='submit'
        value='submit'><Trans>Assign</Trans></Button>
    </form>;


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
          <IconButton
            aria-label='close'
            onClick={props.handleClose}
            className='close-icon-wrapper'
            onSubmit={() => {
              props.handleClose();
              dispatch(requestEmployeesList(props.page, props.rowsPerPage));
            }}>
            <CloseIcon className='close-icon icons-color'/>
          </IconButton>
          {modalBody}
        </div>
      </div>
    </Modal>);
};

HRmodalWindowTestAssignment.propTypes =
  {
    test: PropTypes.any,
    open: PropTypes.bool,
    setOpenCantAssign: PropTypes.func,
    handleClose: PropTypes.func,
    page: PropTypes.any,
    rowsPerPage: PropTypes.any,
  };

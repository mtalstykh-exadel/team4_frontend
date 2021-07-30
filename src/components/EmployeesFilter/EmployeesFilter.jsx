import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import './EmployeesFilter.scss';

const validation = Yup.object({
  userName: Yup.string()
});

export const EmployeesFilter = (props) => {

  const onSubmit = (values) => {
    props.setUserName(values.userName);
  };

  const formik = useFormik({
    initialValues: { userName: '' },
    validationSchema: validation, onSubmit
  });
  return (
    <>
      <form className='employees-filter-form' onSubmit={formik.handleSubmit} >
        <TextField label='Name' className='employees-filter-form' variant='outlined' size='small'
          value={formik.values.userName} onChange={formik.handleChange} inputProps={{ name: 'userName' }} />
      </form>
    </>
  );
};

EmployeesFilter.propTypes = {
  setUserName: PropTypes.func
};

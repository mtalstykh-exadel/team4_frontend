import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import './EditTestsFilter.scss';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const validation = Yup.object({
  questId: Yup.number()
});

export const EditTestsFilter = (props) => {

  const testLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const testModules = ['Grammar', 'Listening', 'Essay', 'Speaking'];

  const testLevelsList = testLevels.map((elem) => {
    return (
      <MenuItem className='edit-tests-option' key={elem} value={elem}>{elem}</MenuItem>
    );
  });

  const testModulesList = testModules.map((elem) => {
    return (
      <MenuItem className='edit-tests-option' key={elem} value={elem}>{elem}</MenuItem>
    );
  });

  const onSubmit = (values) => {
    props.setLevel(values.level);
    props.setModule(values.module);
    props.setQuestId(values.questId);
  };

  const formik = useFormik({
    initialValues: { level: '', module: '', questId: '' },
    validationSchema: validation, onSubmit
  });

  return (
    <>
      <form className='edit-tests-search-form' onSubmit={formik.handleSubmit} >
        <FormControl variant='outlined' className='edit-tests-search-level' size='small'>
          <InputLabel htmlFor='level'>Level</InputLabel>
          <Select name='level' label='Level' value={formik.values.level} inputProps={{ name: 'level' }} onChange={formik.handleChange}>
            <MenuItem value='' className='edit-tests-option edit-tests-option-none'>None</MenuItem>
            {testLevelsList}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className='edit-tests-search-module' size='small'>
          <InputLabel htmlFor='module'>Module</InputLabel>
          <Select name='module' label='module' value={formik.values.module} inputProps={{ name: 'module' }} onChange={formik.handleChange}>
            <MenuItem value='' className='edit-tests-option edit-tests-option-none'>None</MenuItem>
            {testModulesList}
          </Select>
        </FormControl>
        <TextField label='Question ID' className='edit-tests-search-id' variant='outlined' size='small'
          value={formik.values.QuestId} onChange={formik.handleChange} inputProps={{ name: 'questId' }} />

        <Button disabled={!props.level && !props.module} color='primary' variant='contained'
        type='submit' className='btn-search'>
          Search
        </Button>
      </form>
      {formik.errors.questId ? <div>In field 'Question Id' must be a number</div> : null}
    </>
  );
};

EditTestsFilter.propTypes = {
  level: PropTypes.any,
  module: PropTypes.any,
  setLevel: PropTypes.func,
  setModule: PropTypes.func,
  setQuestId: PropTypes.func
};

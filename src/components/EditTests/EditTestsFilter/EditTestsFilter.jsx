import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import './EditTestsFilter.scss';
import MenuItem from '@material-ui/core/MenuItem';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Trans } from '@lingui/macro';
import { useDispatch } from 'react-redux';
import {
  removeQuestionsList, requestListeningQuestionsList, requestQuestion,
  requestQuestionsList
} from '../../../store/actions/coachActions';
import { getQuestionsList, getListeningQuestionsList } from '../../../api/questions-requests';

const validation = Yup.object({
  questionId: Yup.number()
});

export const EditTestsFilter = (props) => {
  const dispatch = useDispatch();

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
    if (!values.level) {
      dispatch(removeQuestionsList());
    }
    if (values.level && values.module) {
      props.setLevel(values.level);
      if (values.module === 'Listening') {
        dispatch(requestListeningQuestionsList(values.level, values.status, props.page, props.rowsPerPage));
        handleCount(getListeningQuestionsList(values.level, values.status, props.page, props.rowsPerPage));
      } else {
        dispatch(requestQuestionsList(values.level, values.module.toUpperCase(), values.status, props.page, props.rowsPerPage));
        handleCount(getQuestionsList(values.level, values.module.toUpperCase(), values.status, props.page, props.rowsPerPage));
      }
    }
    if (values.questionId && values.module) {
      dispatch(requestQuestion(values.questionId));
    }
    props.setStatus(values.status);
    props.setModule(values.module);
    props.setQuestionId(values.questionId);
  };

  const handleCount = (getList) => {
    getList
      .then((response) => {
        if (response.length > 0) {
          props.setCount(props.rowsPerPage * (props.page + 2));
        }
      });
  };

  const formik = useFormik({
    initialValues: { level: null, module: null, status: 'UNARCHIVED', questionId: '' },
    validationSchema: validation, onSubmit
  });

  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);

  return (
    <>
      <form className='edit-tests-search-form' onSubmit={formik.handleSubmit} >
        <FormControl variant='outlined' className='edit-tests-search-level' size='small'>
          <InputLabel htmlFor='level'><Trans>Level</Trans></InputLabel>
          <Select name='level' label='Level' value={formik.values.level} inputProps={{ name: 'level' }} onChange={formik.handleChange}>
            <MenuItem value='' className='edit-tests-option edit-tests-option-none'><Trans>None</Trans></MenuItem>
            {testLevelsList}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className='edit-tests-search-module' size='small'>
          <InputLabel htmlFor='module'><Trans>Module</Trans></InputLabel>
          <Select name='module' label='module' value={formik.values.module} inputProps={{ name: 'module' }} onChange={formik.handleChange}>
            <MenuItem value='' className='edit-tests-option edit-tests-option-none'><Trans>None</Trans></MenuItem>
            {testModulesList}
          </Select>
        </FormControl>

        <FormControl variant='outlined' className='edit-tests-search-module' size='small'>
          <InputLabel htmlFor='status'><Trans>Status</Trans></InputLabel>
          <Select name='status' label='module' value={formik.values.status} inputProps={{ name: 'status' }} onChange={formik.handleChange}>
            <MenuItem value='UNARCHIVED' className='edit-tests-option edit-tests-option-none'><Trans>Not archived</Trans></MenuItem>
            <MenuItem className='edit-tests-option' value='ARCHIVED'><Trans>Archived</Trans></MenuItem>
          </Select>
        </FormControl>
        <TextField label={<Trans>Question ID</Trans>} className='edit-tests-search-id' variant='outlined' size='small'
          value={formik.values.questionId} inputProps={{ name: 'questionId' }} onChange={formik.handleChange} />

      </form>
      {formik.errors.questionId ? <div><Trans>In field 'Question Id' must be a number</Trans></div> : null}
    </>
  );
};

EditTestsFilter.propTypes = {
  setModule: PropTypes.func,
  setLevel: PropTypes.func,
  setQuestionId: PropTypes.func,
  setStatus: PropTypes.func,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  count: PropTypes.any,
  setCount: PropTypes.any,
};

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './TestsInfoSearchForm.scss';

const TestInfoSearchForm = (props) => {
  const testLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const onSubmit = (values) => {
    props.setFilter(values.level);
  };

  const formik = useFormik({ initialValues: { level: '' }, validationSchema: null, onSubmit });

  useEffect(() => {
    formik.submitForm();
  }, [formik.values]);
  return (
    <div className='searchForm'>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant="outlined" className='formControl' size='small'>
          <InputLabel htmlFor="level">Level</InputLabel>
          <Select native value={formik.values.level} name='level' onChange={formik.handleChange}
            label="Level"
            inputProps={{ name: 'level' }}
          >
            <option aria-label="All" value={null} />
            {testLevels.map((el) => <option key={testLevels.indexOf(el)}>{el}</option>)}
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

TestInfoSearchForm.propTypes = {
  setFilter: PropTypes.func
};

export default TestInfoSearchForm;

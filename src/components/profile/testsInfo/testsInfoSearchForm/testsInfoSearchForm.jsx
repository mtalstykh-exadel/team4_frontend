import React from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './testsInfoSearchForm.scss';

const TestInfoSearchForm = (props) => {

  const testLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const onSubmit = (values) => {
    props.setFilter(values.level);
  };

  const formik = useFormik({ initialValues: { level: '' }, validationSchema: null, onSubmit });
  return (
    <div className='searchForm'>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant="outlined" className='formControl' size='small'>
          <InputLabel htmlFor="level">Level</InputLabel>
          <Select native value={formik.values.level} name='level' onChange={formik.handleChange} label="Level"
            inputProps={{ name: 'level' }}>
            <option aria-label="All" value={null} />
            {testLevels.map((o) => <option key={testLevels.indexOf(o)}>{o}</option>)}
          </Select>
        </FormControl>
        <Button color="primary" variant="contained" type="submit" className='submitButton'>
          Submit
        </Button>
      </form>
    </div>
  );
};

TestInfoSearchForm.propTypes = {
  setFilter: PropTypes.func
};

export default TestInfoSearchForm;

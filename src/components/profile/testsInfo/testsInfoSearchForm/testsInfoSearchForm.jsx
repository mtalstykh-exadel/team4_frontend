import React from 'react';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import './testsInfoSearchForm.scss';

const TestInfoSearchForm = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: '0 10px 0 0',
      minWidth: 100,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }));
  const classes = useStyles();

  const onSubmit = (values) => {
    props.setFilter(values.level);
  };

  const formik = useFormik({ initialValues: { level: '' }, validationSchema: null, onSubmit });
  return (
    <div className = 'searchForm'>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl} size='small'>
          <InputLabel htmlFor="level">Level</InputLabel>
          <Select native value={formik.values.level} name='level' onChange={formik.handleChange} label="Level"
            inputProps={{ name: 'level' }}>
            <option aria-label="All" value = {null} />
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
            <option>C1</option>
            <option>C2</option>
          </Select>
        </FormControl>

        <Button color="primary" variant="contained" type="submit" style={{ height: 40 }}>
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

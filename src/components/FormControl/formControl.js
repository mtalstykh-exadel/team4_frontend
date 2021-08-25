import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './formControl.scss';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';

export const FilterFormControl = (props) => {

  const filterList = props.filterData.map((elem, index) => {
    return (
      <MenuItem
        className='edit-tests-option item'
        key={index}
        value={elem[0]}>
        <Trans>{elem[0]}{elem[1]}</Trans>
      </MenuItem>
    );
  });

  return (
    <div className='form-control-wrapper'>
      <FormControl
        className='form-control'
        variant='outlined'
        required
        size='small'>
        <InputLabel htmlFor={props.filterName}>
          <Trans>{props.label[0]}{props.label[1]}</Trans>
        </InputLabel>
        <Select
          name={props.filterName}
          label={props.filterName}
          value={props.value}
          inputProps={{ name: props.filterName }}
          onChange={props.onChange}>
          {filterList}
        </Select>
      </FormControl>
    </div>
  );
};

FilterFormControl.propTypes = {
  filterData: PropTypes.array,
  filterName: PropTypes.string,
  label: PropTypes.array,
  onChange: PropTypes.func,
  submitForm: PropTypes.func,
  value: PropTypes.string
};

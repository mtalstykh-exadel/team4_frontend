import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './formControl.scss';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';

export const FilterFormControl = (props) => {

  const filterList = props.filterData.map((elem) => {
    return (
      <MenuItem
        className='edit-tests-option'
        key={elem}
        value={elem}>
        {elem}
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
          <Trans>{props.filterName}</Trans>
        </InputLabel>
        <Select
          name={props.filterName}
          label={props.filterName}
          value={props.value}
          inputProps={{ name: props.filterName }}
          onChange={props.onChange}>
          <MenuItem value=''>
            <Trans>None</Trans>
          </MenuItem>
          {filterList}
        </Select>
      </FormControl>
    </div>
  );
};

FilterFormControl.propTypes = {
  filterData: PropTypes.array,
  filterName: PropTypes.string,
  onChange: PropTypes.func,
  submitForm: PropTypes.func,
  value: PropTypes.string
};

import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import './EditTestsInfo.scss';

const EditTestsInfo = () => {

  const [level, setLevel, ID] = React.useState('');

  const handleChange = (event) => {
    setLevel(event.target.value);
    setModule(event.target.value);
  };

  const [module, setModule] = React.useState('');

  return (
    <div>
      <form className='edit-tests-search-form'>
        <FormControl variant="outlined" className="edit-tests-search-level" size='small'>
          <InputLabel htmlFor="level">Level</InputLabel>
          <Select name='level' label="Level" value={level} inputProps={{ name: 'level' }} onChange={handleChange} className="edit-questions-select">
            <option className='edit-tests-option' value="">None</option>
            <option className='edit-tests-option' value='A1'>A1</option>
            <option className='edit-tests-option' value='A2'>A2</option>
            <option className='edit-tests-option' value='B1'>B1</option>
            <option className='edit-tests-option' value='B2'>B2</option>
            <option className='edit-tests-option' value='C1'>C1</option>
            <option className='edit-tests-option' value='C2'>C2</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="edit-tests-search-module" size='small'>
          <InputLabel htmlFor="module">Module</InputLabel>
          <Select name='module' label='module' value={module} inputProps={{ name: 'module' }} onChange={handleChange}>
            <option className='edit-tests-option' value="">None</option>
            <option className='edit-tests-option' value='Gramma'>Gramma</option>
            <option className='edit-tests-option' value='Listening'>Listening</option>
            <option className='edit-tests-option' value='Essay'>Essay</option>
          </Select>
        </FormControl>
        <TextField label="ID" variant="outlined" size='small' value={ID} inputProps={{ name: 'ID' }} />
        <Button color="primary" variant="contained" type="search" className='btn-search'>
          Search
        </Button>
      </form>
    </div>
  );
};

export default EditTestsInfo;

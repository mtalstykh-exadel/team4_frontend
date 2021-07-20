import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import './EditTestsInfo.scss';
import MenuItem from '@material-ui/core/MenuItem';

const EditTestsInfo = () => {

  const [level, setLevel] = useState('');
  const [module, setModule] = useState('');
  const [QuestId, setQuestId] = useState('');

  const testLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const testModules = ['Gramma', 'Listening', 'Essay', 'Speaking'];

  const testLevelsList = testLevels.map((elem) => { return (<MenuItem className='edit-tests-option' key={elem} value={elem}>{elem}</MenuItem>); });

  const testModulesList = testModules.map((elem) => { return (<MenuItem className='edit-tests-option' key={elem} value={elem}>{elem}</MenuItem>); });

  return (
    <>
      <form className='edit-tests-search-form'>
        <FormControl variant="outlined" className="edit-tests-search-level" size='small'>
          <InputLabel htmlFor="level">Level</InputLabel>
          <Select name='level' label="Level" value={level} inputProps={{ name: 'level' }} onChange={(event) => setLevel(event.target.value)}>
            <MenuItem value="" className='edit-tests-option edit-tests-option-none'>None</MenuItem>
            {testLevelsList}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className="edit-tests-search-module" size='small'>
          <InputLabel htmlFor="module">Module</InputLabel>
          <Select name='module' label='module' value={module} inputProps={{ name: 'module' }} onChange={(event) => setModule(event.target.value)}>
            <MenuItem value="" className='edit-tests-option edit-tests-option-none'>None</MenuItem>
            {testModulesList}
          </Select>
        </FormControl>
        <TextField label="ID" className="edit-tests-search-id" variant="outlined" size='small' value={QuestId} onChange={(event) => setQuestId(event.target.value)} inputProps={{ name: 'ID' }} />
        <Button color="primary" variant="contained" type="search" className='btn-search'>
          Search
        </Button>
      </form>
    </>
  );
};

export default EditTestsInfo;

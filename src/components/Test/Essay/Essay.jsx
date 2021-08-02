import React, { useState } from 'react';
import './Essay.scss';
import { TextField } from '@material-ui/core';

export const Essay = () => {
  const [characters, setCharacters] = useState('');

  const handleChange = (event) => {
    setCharacters(event.target.value);
  };

  return (
    <div className='essay-step'>
      <div className='step-description'>Write an essay on a given topic</div>
      <div className='essay-topic'>Essay Topic</div>
      <TextField
        onPaste={(event) => {
          event.preventDefault();
          return false;
        }}
        onCopy={(event) => {
          event.preventDefault();
          return false;
        }}
        onCut={(event) => {
          event.preventDefault();
          return false;
        }}
        className='essay-input'
        variant='outlined'
        multiline
        rows={10}
        value={characters}
        onChange={handleChange}
        inputProps={{ maxLength: 512 }}
      />
      <div className='essay-characters'>{characters.length} out of 512 characters</div>
    </div>
  );
};


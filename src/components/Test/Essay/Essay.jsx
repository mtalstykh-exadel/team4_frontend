import React, { useState } from 'react';
import './Essay.scss';
import { TextField } from '@material-ui/core';
import { Trans } from '@lingui/macro';

export const Essay = () => {
  const [characters, setCharacters] = useState('');

  const handleChange = (event) => {
    setCharacters(event.target.value);
  };

  return (
    <div className='essay-step'>
      <div className='step-description'><Trans>Write an essay on a given topic</Trans></div>
      <div className='essay-topic'><Trans>Essay Topic</Trans></div>
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
      <div className='essay-characters'>{characters.length} <Trans>out of 512 characters</Trans></div>
    </div>
  );
};


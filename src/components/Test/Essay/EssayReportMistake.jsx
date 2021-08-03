import React, {useState} from 'react';
import '../../../styles/modal.scss';
import Button from '@material-ui/core/Button';
import { Trans } from '@lingui/macro';
import '../Listening/ListeningReportMistake.scss';
import {TextField} from '@material-ui/core';

export const EssayReportMistake = () => {
  const [characters, setCharacters] = useState('');

  const handleChange = (event) => {
    setCharacters(event.target.value);
  };
  return (
    <div className='main'>
      <div className='header'>Report a mistake</div>
      <div className='essay-topic' style = {{ fontSize: '16px',
        paddingTop: '15px', textAlign: 'center'}}><Trans>Essay Topic</Trans></div>

      <TextField
        className='essay-input'
        variant='outlined'
        multiline
        rows={10}
        value={characters}
        onChange={handleChange}
        inputProps={{ maxLength: 512 }}
      />
      <div className='btn'>
        <Button className='delete-button'
                color='primary' size='small'>Delete</Button>
        <Button className='report-button'
                color='primary' variant='contained' size='small'>Report</Button>
      </div>
    </div>
  );
};


import React from 'react';
import PropTypes from 'prop-types';
import '../../../../styles/modal.scss';
import Button from '@material-ui/core/Button';
import '../ReportMistake.scss';
import {TextField, MenuItem} from '@material-ui/core';

export const ListeningReportMistake = ({tasks, level}) => {
  let count = 0;
  return (
    <div className='main'>
      <div className='header'>Report a mistake</div>
      <div className='level-module'>
        <span className='level'>Level: {level}</span>
        <span className='module0'>Module: Listening</span>
      </div>

      <div className='selector'>
        <TextField className='select' value='0' select>
          {tasks.map((item, index) => {
            count++;
                     return <MenuItem key={count} value={index}>{count}. {item.sentence}</MenuItem>;
          })}
        </TextField>
      </div>
      <div className='btn'>
        <Button className='delete-button'
                color='primary' >Delete</Button>
        <Button className='report-button'
                color='primary' variant='contained'>Report</Button>
      </div>
    </div>
  );


};

ListeningReportMistake.propTypes = {
  tasks: PropTypes.array,
  level: PropTypes.string,
};

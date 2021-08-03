import React from 'react';
import '../../../../styles/modal.scss';
import Button from '@material-ui/core/Button';
import '../ReportMistake.scss';
import { TextField} from '@material-ui/core';
import PropTypes from 'prop-types';

export const EssayReportMistake = ({level, theme}) => {

  return (
    <div className='report-mistake-modal'>
      <div className='report-header'>Report a mistake</div>
      <div className='level-module-info'>
        <span className='level-info'>Level: {level}</span>
        <span className='module0'>Module: Essay</span>
      </div>
       <div className='theme'>{theme}</div>
      <div className='report-textfield-wrapper'>
        <TextField
          className='report-textfield'
          variant='outlined'
          multiline
          rows={6}
          label='Enter your report'
        />
      </div>
      <div className='report-mistake-buttons-wrapper'>
        <Button className='delete-button' color='primary' variant='outlined'>Delete</Button>
        <Button className='report-button' color='primary' variant='contained'>Report</Button>
      </div>
    </div>
  );
};

EssayReportMistake.propTypes = {
  level: PropTypes.string,
  theme: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';
import '../../../../styles/modal.scss';
import Button from '@material-ui/core/Button';
import './ListeningReportMistake.scss';

export const ListeningReportMistake = ({tasks}) => {
  let count = 0;
  return (
    <div className='main'>
      <div className='header'>Report a mistake</div>
      <div className='selector'>
        <select>
          {tasks.map((item, index) => {
            count++;
            return <option key={index} style={{fontSize: '16px',width: '949px'}}>{count}. {item.sentence}</option>;
          })}
        </select>
      </div>
      <div className='btn'>
        <Button className='delete-button'
                color='primary' size='small'>Delete</Button>
        <Button className='report-button'
                color='primary' variant='contained' size='small'>Report</Button>
      </div>
    </div>
  );


};

ListeningReportMistake.propTypes = {
  tasks: PropTypes.array,
};

import React from 'react';
import '../../../../styles/modal.scss';
import Button from '@material-ui/core/Button';
import { Trans } from '@lingui/macro';
import '../ReportMistake.scss';

export const SpeakingReportMistake = () => {
  return (
    <div className='main'>
      <div className='header'>Report a mistake</div>
      <div className='essay-topic' style = {{ fontSize: '16px',
        paddingTop: '15px', textAlign: 'center'}}><Trans>Speaking Topic</Trans></div>
      <div className='btn'>
        <Button className='delete-button'
                color='primary' size='small'>Delete</Button>
        <Button className='report-button'
                color='primary' variant='contained' size='small'>Report</Button>
      </div>
    </div>
  );
};


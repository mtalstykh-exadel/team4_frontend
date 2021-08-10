import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Listening.scss';
import { Grammar, Player } from '../../index';
import { Trans } from '@lingui/macro';
import axiosInstance from '../../../api/axios';

export const Listening = ({ tasks, contentFile }) => {

  const [url, setUrl] = useState('');
  useEffect(() => {
    axiosInstance.get('/files/' + contentFile.url, {
      responseType: 'blob',
    }).then((response) => {
      setUrl(URL.createObjectURL(new Blob([response.data], {type: 'audio/ogg'})));
    });
  },[setUrl]);

  return (
    <div className='listening-step'>
      <div className='step-description'>
        <Trans>Listen and choose an answer option</Trans>
      </div>
      <div className='audio'>
        <Player
          id='player-listening'
          src={ url }
        />
      </div>
      <Grammar tasks={tasks} />
    </div>
  );
};

Listening.propTypes = {
  contentFile: PropTypes.any,
  tasks: PropTypes.array,
};

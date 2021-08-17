import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Listening.scss';
import { Grammar, Player } from '../../index';
import { Trans } from '@lingui/macro';
import { getAudioFile } from '../../../api/get-audioFIle';

export const Listening = ({ tasks, contentFile, testModule }) => {
  const [url, setUrl] = useState('');

  useEffect(
    async function () {
      setUrl(
        await getAudioFile(contentFile.url).then((response) => {
          return URL.createObjectURL(
            new Blob([response.data], { type: 'audio/ogg' })
          );
        })
      );
    },
    [setUrl]
  );

  return (
    <div className='listening-step'>
      <div className='step-description'>
        <Trans>Listen and choose an answer option</Trans>
      </div>
      <div className='audio'>
        <Player id='player-listening' src={url} />
      </div>
      <Grammar tasks={tasks} testModule={testModule} />
    </div>
  );
};

Listening.propTypes = {
  contentFile: PropTypes.any,
  tasks: PropTypes.array,
  testModule: PropTypes.string,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Listening.scss';
import { Grammar, Player } from '../../index';
import { Trans } from '@lingui/macro';
import { getAudioFile } from '../../../api/get-audioFIle';
import { testAudioAttempts } from '../../../constants/localStorageConstants';

export const Listening = ({ tasks, contentFile, testModule, reportModule, level, testID, module }) => {
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
        <p className='step-description'>
          <Trans>You have {localStorage.getItem(testAudioAttempts)} attempts left to listen to audio</Trans>
        </p>
      </div>
      <Grammar tasks={tasks} testModule={testModule} level={level} testID={testID} reportModule={reportModule} module={module} />
    </div>
  );
};

Listening.propTypes = {
  contentFile: PropTypes.any,
  tasks: PropTypes.array,
  testModule: PropTypes.string,
  level: PropTypes.string,
  testID: PropTypes.number,
  reportModule: PropTypes.string,
  module: PropTypes.array
};

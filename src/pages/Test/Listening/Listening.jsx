import React from 'react';
import PropTypes from 'prop-types';
import './Listening.scss';
import Grammar from '../Grammar/Grammar';
import Player from '../player/player';
import { Trans } from '@lingui/macro';

const Listening = ({ tasks }) => {

  return (
    <div className='listening-step'>
      <div className='step-description'><Trans>Listen and choose an answer option</Trans></div>
      <div className='audio'>
        <Player
          id='player-listening'
          src='https://www.signalogic.com/melp/EngSamples/Orig/male.wav'
        />
      </div>
      <Grammar tasks={tasks} />
    </div>
  );
};

Listening.propTypes = {
  tasks: PropTypes.array,
};

export default Listening;

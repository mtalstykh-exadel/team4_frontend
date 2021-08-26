import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import '@globalStyles/modal.scss';
import './ModalWindowListeningPlayer.scss';

import { getAudioFile } from '@api/get-audioFIle';
import { Player } from '@player/Player';

import { Trans } from '@lingui/macro';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

export const ModalWindowListeningPlayer = ({ handleClose, question }) => {

  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    async function () {
      question.url && setLoading(true);
      setAudioUrl(
        await getAudioFile(question.url)
          .then((response) => {
            return URL.createObjectURL(
              new Blob([response.data], { type: 'audio/ogg' })
            );
          })
          .catch((err) => {
            if (err.response.status === 404) {
              setAudioUrl(null);
            }
          })
      );
      setLoading(false);
    },
    [setAudioUrl]
  );

  return (
    <div className='modal-warning-archive-wrapper'>
      <div className='text font-primary'><Trans>Topic: </Trans>{question.topic}</div>
      <div className='player-modal'>
        {
          audioUrl
            ? <Player id='player-ListeningEditTests' src={audioUrl} />
            : loading
            && <CircularProgress className='border-primary' size='25px' />
        }
      </div>
      <div className='btn'>
        <Button variant='contained' color='primary' onClick={() => handleClose(false, 'player')} className='button-standard'><Trans>Close</Trans></Button>
      </div>
    </div>
  );
};

ModalWindowListeningPlayer.propTypes =
{
  handleClose: PropTypes.func,
  question: PropTypes.any
};

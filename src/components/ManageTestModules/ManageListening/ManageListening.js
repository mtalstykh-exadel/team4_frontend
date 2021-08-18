import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import './ManageListening.scss';

import { ManageTopic } from '../ManageTopic/ManageTopic';
import { ManageGrammar } from '../ManageGrammar/ManageGrammar';
import { Player } from '../../Player/Player';
import { getAudioFile } from '../../../api/get-audioFIle';

export const ManageListening = (props) => {

  const [moduleData, setModuleData] = useState(props.moduleData);
  const [audio, setAudio] = useState(moduleData.url);

  useEffect(
    async function () {
      setAudio(
        await getAudioFile(moduleData.url).then((response) => {
          return URL.createObjectURL(
            new Blob([response.data], { type: 'audio/ogg' })
          );
        })
      );
    },
    [setAudio]
  );

  useEffect(() => {
    props.handleModule(moduleData);
  }, [moduleData]);

  useEffect(() => {
    props.handleAudio(audio);
  }, [audio]);

  const handleArr = (index) => (value) => {
    const questionsArray = [...moduleData.questions];
    questionsArray[index] = value;
    setModuleData(Object.assign({}, moduleData, {
      questions: questionsArray
    }));
  };

  const handleTopic = (value) => {
    setModuleData(Object.assign({}, moduleData,
      { topic: value }));
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.required = true;
    input.onchange = () => {
      input.files[0].type === 'audio/mpeg' ? setAudio(window.URL.createObjectURL(new Blob(input.files, { type: 'audio/ogg; codecs=opus' }))) : null;
    };
    input.click();
  };

  return (
    <>
      <div className='listening-topic'>
        <ManageTopic
          moduleDescription='Add topic for a Listening'
          handleModule={handleTopic}
          moduleData={moduleData.topic} />
        <div className='audio-wrapper'>{audio ?
          <Player
            id='player-editTests'
            src={audio}
          /> :
          <p><Trans>Upload an audio file for listening task</Trans></p>}
        </div>
        <Button color='primary' variant='contained' onClick={importData}><Trans>Upload Audio</Trans></Button>
      </div>
      {moduleData.questions.map((item, index) => {
        return (
          <ManageGrammar handleModule={handleArr(index)} questionIndex={index + 1} moduleData={item} key={index} />
        );
      })}
    </>
  );
};

ManageListening.propTypes = {
  handleModule: PropTypes.func,
  handleAudio: PropTypes.func,
  moduleData: PropTypes.any
};

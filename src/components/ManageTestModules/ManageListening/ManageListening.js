import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { Trans } from '@lingui/macro';

import './ManageListening.scss';

import { ManageTopic } from '../ManageTopic/ManageTopic';
import { ManageGrammar } from '../ManageGrammar/ManageGrammar';
import { Player } from '../../Player/Player';
import { getAudioFile } from '../../../api/get-audioFIle';
import { CircularProgress } from '@material-ui/core';

export const ManageListening = (props) => {

  const [moduleData, setModuleData] = useState(props.moduleData);
  const [audio, setAudio] = useState();
  const [audioToSend, setAudioToSend] = useState(moduleData.url);
  const [grammarReady, setGrammarReady] = useState(false);
  const [topicReady, setTopicReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setModuleData(Object.assign({}, moduleData, {
      level: props.level
    }));
  }, []);

  useEffect(
    async function () {
      moduleData.url && setLoading(true);
      setAudio(
        await getAudioFile(moduleData.url).then((response) => {
          return URL.createObjectURL(
            new Blob([response.data], { type: 'audio/ogg' })
          );
        })
      );
      setLoading(false);
    },
    [setAudio]
  );

  useEffect(() => {
    if (grammarReady) {
      if (topicReady) {
        if (audio) {
          props.handleReady(true);
        }
      }
    }
    props.handleModule(moduleData);
  }, [moduleData]);

  useEffect(() => {
    if (grammarReady) {
      if (topicReady) {
        if (audio) {
          props.handleReady(true);
        }
      }
    }
    props.handleAudio(audioToSend);
  }, [audioToSend]);

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
      if (input.files[0].type === 'audio/mpeg') {
        setAudio(window.URL.createObjectURL(new Blob(input.files, { type: 'audio/ogg; codecs=opus' })));
        setAudioToSend(new Blob(input.files, { type: 'audio/ogg; codecs=opus' }));
      } else null;
    };
    input.click();
  };
  
  return (
    <>
      <div className='listening-topic'>
        <ManageTopic
          moduleDescription='Add topic for a Listening'
          handleModule={handleTopic}
          handleReady={setTopicReady}
          dataType={props.dataType}
          moduleData={moduleData.topic} />
        <div className='audio-wrapper'>{audio ?
          <Player
            id='player-editTests'
            src={audio}
          /> : loading ? <CircularProgress className='border-primary' size='25px' />
            : <p><Trans>Upload an audio file for listening task</Trans></p>}
        </div>
        <Button disabled={props.dataType} color='primary' variant='contained' onClick={importData}><Trans>Upload Audio</Trans></Button>
      </div>
      {moduleData.questions.map((item, index) => {
        return (
          <ManageGrammar level={props.level} module='Listening' handleModule={handleArr(index)} handleReady={setGrammarReady}
            questionIndex={index + 1} moduleData={item} dataType={props.dataType} key={index} />
        );
      })}
    </>
  );
};

ManageListening.propTypes = {
  handleModule: PropTypes.func,
  handleReady: PropTypes.func,
  handleAudio: PropTypes.func,
  moduleData: PropTypes.any,
  dataType: PropTypes.any,
  ready: PropTypes.any,
  level: PropTypes.any
};

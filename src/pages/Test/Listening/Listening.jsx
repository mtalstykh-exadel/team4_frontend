import React from "react";
import PropTypes from 'prop-types';
import "./Listening.scss";
import Grammar from "../Grammar/Grammar";
import Player from "../player/player";

const Listening = ({ tasks }) => {

  const checkTime = (time) => {
    const minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='listening-step'>
      <div className='step-description'>Listen and choose an answer option</div>
      <div className='audio'>
        <Player checkTime={checkTime}/>
      </div>
      <Grammar tasks={tasks} />
    </div>
  );
};

Listening.propTypes = {
  tasks: PropTypes.array,
};

export default Listening;

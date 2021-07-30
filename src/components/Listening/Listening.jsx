import React from "react";
import PropTypes from "prop-types";
import "./Listening.scss";
import Grammar from "../Grammar/Grammar";
import Player from "../Player/Player";

const Listening = ({ tasks }) => {

  return (
    <div className="listening-step">
      <div className="step-description">Listen and choose an answer option</div>
      <div className="audio">
        <Player
          id="player-listening"
          src="https://www.signalogic.com/melp/EngSamples/Orig/male.wav"
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

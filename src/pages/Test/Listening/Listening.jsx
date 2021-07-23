import React from "react";
import PropTypes from 'prop-types';
import "./Listening.scss";
import Grammar from "../Grammar/Grammar";

const Listening = ({ tasks }) => {
  return (
    <div className='listening-step'>
      <div className='step-description'>Listen and choose an answer option</div>
      <div className='audio'>
        <audio controls id='play' />
      </div>
      <Grammar tasks={tasks} />
    </div>
  );
};

Listening.propTypes = {
  tasks: PropTypes.array,
};

export default Listening;

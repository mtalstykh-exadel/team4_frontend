import React from "react";
import "./Listening.scss";
import Grammar from "../Grammar/Grammar";

const Listening = ({tasks}) => {
  return (
    <>
      <div className='step-description'>Listen and choose an answer option</div>
      <div className='audio'>
        <audio controls id='play'/>
      </div>
      <Grammar tasks={tasks}/>
    </>
  );
};

Listening.propTypes = {
  tasks: Listening.array,
};

export default Listening;

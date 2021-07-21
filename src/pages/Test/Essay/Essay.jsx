import React, { useState } from "react";
import './Essay.scss';

const Essay = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

    return (
      <>
        <div className='step-description'>Write an essay on a given topic</div>
        <div className='essay-topic'>Essay Topic</div>
        <textarea
          onPaste={() => {return false;}}
          onCopy={() => {return false;}}
          onCut={() => {return false;}}
          className='essay-input' maxLength='512' value={value}
          onChange={handleChange}
        />
        <div className='essay-count'>{value.length} out of 512 characters</div>
      </>
    );
};

export default Essay;

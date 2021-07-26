import React, { useState } from "react";
import "./Essay.scss";

const Essay = () => {
  const [characters, setCharacters] = useState("");

  const handleChange = (event) => {
    setCharacters(event.target.value);
  };

  return (
    <>
      <div className="step-description">Write an essay on a given topic</div>
      <div className="essay-topic">Essay Topic</div>
      <textarea
        onPaste={(event) => {
          event.preventDefault();
          return false;
        }}
        onCopy={(event) => {
          event.preventDefault();
          return false;
        }}
        onCut={(event) => {
          event.preventDefault();
          return false;
        }}
        className="essay-input"
        maxLength="512"
        value={characters}
        onChange={handleChange}
      />
      <div className="essay-characters">{characters.length} out of 512 characters</div>
    </>
  );
};

export default Essay;

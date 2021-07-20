/* eslint-disable max-len */
import React from 'react';
import TestLevelsSelectorItem from './testLevelSelectorItem/testLevelSelectorItem';
import './testLevelSelector.scss';

const TestLevelsSelector = () => {

  const testLevelsData = [
    {
      id: 101,
      title: "Survival Level — Beginner и Elementary (A1)",
      description: "I understand and can use familiar phrases and expressions in speech that are necessary for performing specific tasks. I can introduce myself and introduce others, ask questions and answer questions about the place of residence, acquaintances, property. I can participate in a simple conversation if the interlocutor speaks slowly and clearly and is ready to help."
    },
    {
      id: 102,
      title: "Waystage — Pre-Intermediate (A2)",
      description: "I uI understand individual sentences and common expressions related to the main areas of life (for example, basic information about myself and my family members, shopping, getting a job, etc.). I can perform tasks related to the simple exchange of information on familiar or everyday topics. In simple terms, I can tell you about myself, my family and friends, describe the main aspects of everyday life.nderstand and can use familiar phrases and expressions in speech that are necessary for performing specific tasks. I can introduce myself and introduce others, ask questions and answer questions about the place of residence, acquaintances, property. I can participate in a simple conversation if the interlocutor speaks slowly and clearly and is ready to help."
    },
    {
      id: 103,
      title: "Threshold — Intermediate (B1)",
      description: "I understand the main ideas of clear messages made in a literary language on various topics that typically arise at work, study, leisure, etc.I am able to communicate in most situations that may arise during my stay in the country of the language being studied. I can compose a coherent message on well-known or particularly interesting topics. I can describe my impressions, events, hopes, aspirations, state and justify my opinion and plans for the future."
    },
    {
      id: 104,
      title: "Vantage — Upper-Intermediate (B2)",
      description: "I understand the general content of complex texts on abstract and specific topics, including highly specialized texts. I speak quickly and spontaneously enough to constantly communicate with native speakers without much difficulty for either side. I am able to make clear, detailed messages on various topics and present my view on the main problem, show the advantages and disadvantages of different opinions."
    },
    {
      id: 105,
      title: "Effective Operational Proficiency — Advanced (C1)",
      description: "I understand voluminous complex texts on various topics, I recognize the hidden meaning. I speak spontaneously at a fast pace, without experiencing difficulties with the selection of words and expressions. I use the language flexibly and effectively for communication in scientific and professional activities. I can create an accurate, detailed, well-structured message on complex topics, demonstrating my mastery of text organization models, communication tools and combining its elements."
    },
    {
      id: 106,
      title: "Mastery — Proficiency (C2)",
      description: "I understand almost any oral or written message, I can make a coherent text based on several oral and written sources. I speak spontaneously with a high tempo and a high degree of accuracy, emphasizing the shades of meaning even in the most difficult cases."
    }
  ];

  const testLevelsDataArr = testLevelsData.map((level, id) => <TestLevelsSelectorItem title={level.title} description={level.description} key={id} />);
  return (
    <div className="test-level-selector-wrapper">
      {testLevelsDataArr}
    </div>
  );
};

export default TestLevelsSelector;

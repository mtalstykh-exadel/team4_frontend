/* eslint-disable max-len */
import React from 'react';
import { TestLevelsSelectorItem } from './TestLevelSelectorItem/TestLevelSelectorItem';

export const TestLevelSelector = () => {

  const testLevelsDataEN = [
    {
      id: 101,
      titleEN: 'Beginner и Elementary (A1)',
      descriptionEN: 'I understand and can use familiar phrases and expressions in speech that are necessary for performing specific tasks. I can introduce myself and introduce others, ask questions and answer questions about the place of residence, acquaintances, property. I can participate in a simple conversation if the interlocutor speaks slowly and clearly and is ready to help.',
      titleRU: 'Начальный и элементарный (A1)',
      descriptionRU: 'Я понимаю и могу использовать в речи знакомые фразы и выражения, которые необходимы для выполнения конкретных задач. Могу представиться и познакомить других, задать вопросы и ответить на вопросы о месте жительства, знакомых, собственности. Я могу участвовать в простой беседе, если собеседник говорит медленно и четко и готов помочь.',
      level: 'A1'
    },
    {
      id: 102,
      titleEN: 'Pre-Intermediate (A2)',
      descriptionEN: 'I understand individual sentences and common expressions related to the main areas of life (for example, basic information about myself and my family members, shopping, getting a job, etc.). I can perform tasks related to the simple exchange of information on familiar or everyday topics. In simple terms, I can tell you about myself, my family and friends, describe the main aspects of everyday life.nderstand and can use familiar phrases and expressions in speech that are necessary for performing specific tasks. I can introduce myself and introduce others, ask questions and answer questions about the place of residence, acquaintances, property. I can participate in a simple conversation if the interlocutor speaks slowly and clearly and is ready to help.',
      titleRU: 'Уровень ниже среднего (A2)',
      descriptionRU: 'Я понимаю отдельные предложения и общие выражения, относящиеся к основным сферам жизни (например, основная информация обо мне и членах моей семьи, покупки, поиск работы и т. Д.). Могу выполнять задания, связанные с простым обменом информацией на знакомые или повседневные темы. Говоря простым языком, я могу рассказать вам о себе, своей семье и друзьях, описать основные аспекты повседневной жизни. Понимать и использовать в речи знакомые фразы и выражения, которые необходимы для выполнения конкретных задач. Могу представиться и познакомить других, задать вопросы и ответить на вопросы о месте жительства, знакомых, собственности. Я могу участвовать в простой беседе, если собеседник говорит медленно и четко и готов помочь.',
      level: 'A2'
    },
    {
      id: 103,
      titleEN: 'Intermediate (B1)',
      descriptionEN: 'I understand the main ideas of clear messages made in a literary language on various topics that typically arise at work, study, leisure, etc.I am able to communicate in most situations that may arise during my stay in the country of the language being studied. I can compose a coherent message on well-known or particularly interesting topics. I can describe my impressions, events, hopes, aspirations, state and justify my opinion and plans for the future.',
      titleRU: 'Средний (B1)',
      descriptionRU: 'Я понимаю основные идеи четких сообщений на литературном языке по различным темам, которые обычно возникают на работе, учебе, отдыхе и т. Д. Я могу общаться в большинстве ситуаций, которые могут возникнуть во время моего пребывания в стране изучаемого языка . Могу составить связное сообщение на известные или особенно интересные темы. Я могу описать свои впечатления, события, надежды, стремления, изложить и обосновать свое мнение и планы на будущее.',
      level: 'B1'
    },
    {
      id: 104,
      titleEN: 'Upper-Intermediate (B2)',
      descriptionEN: 'I understand the general content of complex texts on abstract and specific topics, including highly specialized texts. I speak quickly and spontaneously enough to constantly communicate with native speakers without much difficulty for either side. I am able to make clear, detailed messages on various topics and present my view on the main problem, show the advantages and disadvantages of different opinions.',
      titleRU: 'Выше среднего (B2)',
      descriptionRU: 'Я понимаю общее содержание сложных текстов на абстрактные и конкретные темы, включая узкоспециализированные тексты. Я говорю достаточно быстро и спонтанно, чтобы постоянно общаться с носителями языка без особых трудностей для обеих сторон. Я умею делать четкие, подробные сообщения на разные темы и представлять свой взгляд на основную проблему, показывать преимущества и недостатки разных мнений.',
      level: 'B2'
    },
    {
      id: 105,
      titleEN: 'Advanced (C1)',
      descriptionEN: 'I understand voluminous complex texts on various topics, I recognize the hidden meaning. I speak spontaneously at a fast pace, without experiencing difficulties with the selection of words and expressions. I use the language flexibly and effectively for communication in scientific and professional activities. I can create an accurate, detailed, well-structured message on complex topics, demonstrating my mastery of text organization models, communication tools and combining its elements.',
      titleRU: 'Продвинутый (C1)',
      descriptionRU: 'Понимаю объемные сложные тексты на разные темы, распознаю скрытый смысл. Я говорю спонтанно в быстром темпе, не испытывая затруднений с подбором слов и выражений. Я использую язык гибко и эффективно для общения в научной и профессиональной деятельности. Я могу составить точное, подробное, хорошо структурированное сообщение по сложным темам, демонстрируя мое владение моделями организации текста, инструментами коммуникации и объединением их элементов.',
      level: 'C1'
    },
    {
      id: 106,
      titleEN: 'Proficiency (C2)',
      descriptionEN: 'I understand almost any oral or written message, I can make a coherent text based on several oral and written sources. I speak spontaneously with a high tempo and a high degree of accuracy, emphasizing the shades of meaning even in the most difficult cases.',
      titleRU: 'Мастерство (C2)',
      descriptionRU: 'Я понимаю практически любое устное или письменное сообщение, могу составить связный текст на основе нескольких устных и письменных источников. Я говорю спонтанно, в высоком темпе и с высокой степенью точности, подчеркивая оттенки смысла даже в самых сложных случаях.',
      level: 'C2'
    }
  ];

  const testLevelItemes = testLevelsDataEN.map((level, id) => {
    return (
      <TestLevelsSelectorItem level={level.level} titleEN={level.titleEN} descriptionEN={level.descriptionEN} titleRU={level.titleRU} descriptionRU={level.descriptionRU} key={id} />
    );
  });

  return (
    <div className='test-level-selector-list'>
      {testLevelItemes}
    </div>
  );
};

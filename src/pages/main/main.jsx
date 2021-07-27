import React from 'react';
import LevelSelector from '../../components/Level-selector/level-selector.jsx';
import Layout from '../../components/Layout/Layout';
import './main.scss';

const Main = () => {
  return (
    <Layout>
      <h1>Testing procedure</h1>
      <p className='subtitle'>Choose a test according to the expected level of English. If you don't know your level, then start with the first test.</p>
      <LevelSelector/>
    </Layout>
  );
};

export default Main;

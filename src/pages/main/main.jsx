import React from 'react';
import TestLevelsSelector from '../../components/testLevelSelector/testLevelSelector';
import Layout from '../../components/Layout/Layout';
import './main.scss';

const Main = () => {
  return (
    <Layout>
      <h1>Testing procedure</h1>
      <p className='subtitle'>Choose a test according to the expected level of English. If you don't know your level, then start with the first test.</p>
      <TestLevelsSelector />
    </Layout>
  );
};

export default Main;

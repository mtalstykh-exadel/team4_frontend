import React from 'react';
import TestLevelsSelector from '../../components/testLevelSelector/testLevelSelector';
import Layout from '../../components/layout/Layout';
import './main.scss';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <Layout>
      <Link to='/profile'>Profile</Link>
      <h1>Testing procedure</h1>
      <p className='subtitle'>Choose a test according to the expected level of English. If you don't know your level, then start with the first test.</p>
      <TestLevelsSelector />
    </Layout>
  );
};

export default Main;

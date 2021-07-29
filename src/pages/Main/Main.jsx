import React from 'react';
import { Trans } from '@lingui/macro';
import { TestLevelSelector } from '../../components';
import Layout from '../../components/Layout/Layout';
import './Main.scss';

const Main = () => {
  return (
    <Layout>
      <h1><Trans>Testing procedure</Trans></h1>
      <p className='subtitle'><Trans id='testLevel'>Choose a test according to the expected level of English. If you don't know your level, then start with the first test.</Trans></p>
      <TestLevelSelector />
    </Layout>
  );
};

export default Main;

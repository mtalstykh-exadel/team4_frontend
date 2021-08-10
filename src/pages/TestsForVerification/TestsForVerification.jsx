import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import { TestsForVerificationTable } from '../../components/TestsForVerificationTable/TestsForVerificationTable';

export const TestsForVerification = () => {

  const role = useSelector((state) => state.jwt.role);

  if (role !== 'ROLE_COACH') return <Redirect to='/' />;
  return (
    <Layout>
      <TestsForVerificationTable />
    </Layout>
  );
};

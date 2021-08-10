import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ManageModule } from '../../components';
import Layout from '../../components/Layout/Layout';

export const ManageTest = () => {

  const role = useSelector((state) => state.jwt.role);

  if (role !== 'ROLE_COACH') return <Redirect to='/' />;
  return (
    <Layout>
      <ManageModule />
    </Layout>
  );
};

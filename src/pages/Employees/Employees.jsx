import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import { EmployeesFilter, EmployeesTable } from '../../components';
import './Employees.scss';

export const Employees = () => {

  const [userName, setUserName] = useState(null);
  const role = useSelector((state) => state.jwt.role);

  if (role !== 'ROLE_HR') return <Redirect to='/' />;
  return (
    <Layout pageWrapperClass='employees-wrapper'>
      <EmployeesFilter setUserName={setUserName}/>
      <EmployeesTable userName={userName} />
    </Layout>
  );
};

/*
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ManageModule } from '../../components';
import Layout from '../../components/Layout/Layout';

export const ManageTest = () => {

  const role = useSelector((state) => state.auth.isAuth);

  if (role !== 'ROLE_COACH') return <Redirect to='/' />;
  return (
    <Layout>
      <ManageModule />
    </Layout>
  );
};

*/

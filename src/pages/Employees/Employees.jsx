import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { EmployeesFilter, EmployeesTable } from '../../components';
import './Employees.scss';

export const Employees = () => {

  const [userName, setUserName] = useState(null);

  return (
    <Layout pageWrapperClass='employees-wrapper'>
      <EmployeesFilter userName={userName} setUserName={setUserName}/>
      <EmployeesTable />
    </Layout>
  );
};

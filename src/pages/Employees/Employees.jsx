import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { EmployeesFilter, EmployeesTable } from '../../components';

export const Employees = () => {

  const [userName, setUserName] = useState(null);

  return (
    <Layout>
      <EmployeesFilter userName={userName} setUserName={setUserName}/>
      <EmployeesTable />
    </Layout>
  );
};

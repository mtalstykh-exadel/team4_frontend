import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import { EmployeesFilter, EmployeesTable } from '../../components';
import './Employees.scss';

import { requestEmployeesList } from '../../store/actions/employeesActions';
import { getEmployeesList } from '../../api/employees-fetch';

import { useDispatch } from 'react-redux';

export const Employees = () => {

  const dispatch = useDispatch();

  const [userName, setUserName] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(rowsPerPage);

  const role = useSelector((state) => state.jwt.role);

  const handleFilter = (name) => {
    setPage(0);
    setCount(rowsPerPage);
    setUserName(name);
    dispatch(requestEmployeesList(userName, page, rowsPerPage));
    handleCount(0, name, rowsPerPage);
  };

  const handleCount = (newPage = page) => {
    getEmployeesList(userName, newPage + 1, rowsPerPage)
      .then((response) => {
        if (response.length > 0) {
          setCount(rowsPerPage * (newPage + 2));
        }
      });
  };


  if (role !== 'ROLE_HR') return <Redirect to='/' />;
  return (
    <Layout pageWrapperClass='employees-wrapper'>
      <EmployeesFilter setUserName={handleFilter}/>
      <EmployeesTable userName={userName} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} count={count} handleCount={handleCount}/>
    </Layout>
  );
};

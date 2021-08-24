import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestUserTestsHistory } from '../../store/actions/profileActions';
import getUserTests from '../../api/user-tests';
import TestsData from './TestsData/TestsData';
import TestInfoSearchForm from './TestsInfoSearchForm/TestsInfoSearchForm';

const TestsInfo = () => {

  const dispatch = useDispatch();

  const [filter, setFilter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(rowsPerPage);

  const handleFilter = (level) => {
    setPage(0);
    setCount(rowsPerPage);
    setFilter(level);
    dispatch(requestUserTestsHistory(level, 0, rowsPerPage));
    handleCount(0, level, rowsPerPage);
  };

  const handleCount = (newPage = page, newFilter = filter) => {
    getUserTests(newFilter, newPage + 1, rowsPerPage)
      .then((response) => {
        if (response.length > 0) {
          setCount(rowsPerPage * (newPage + 2));
        }
      });
  };

  return (
    <div>
      <TestInfoSearchForm setFilter={handleFilter} />
      <TestsData filter={filter} setFilter={setFilter} count={count} handleCount={handleCount} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
    </div>
  );
};

export default TestsInfo;

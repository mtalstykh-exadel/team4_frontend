import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestUserTestsHistory } from '../../store/actions/profileActions';
import TestsData from './TestsData/TestsData';
import TestInfoSearchForm from './TestsInfoSearchForm/TestsInfoSearchForm';

const TestsInfo = () => {
  const [filter, setFilter] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUserTestsHistory());
  }, []);
  return (
    <div>
      <TestInfoSearchForm setFilter={setFilter} />
      <TestsData filter={filter} />
    </div>
  );
};

export default TestsInfo;

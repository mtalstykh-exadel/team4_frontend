import React from 'react';
import { useState } from 'react';
import TestsData from './TestsData/testsData';
import TestInfoSearchForm from './TestsInfoSearchForm/TestsInfoSearchForm';

const TestsInfo = () => {
  const [filter, setFilter] = useState(null);
  return (
    <div>
      <TestInfoSearchForm setFilter={setFilter} />
      <TestsData filter={filter} />
    </div>
  );
};

export default TestsInfo;

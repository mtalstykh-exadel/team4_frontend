import React from 'react';
import { useState } from 'react';
import TestsData from './testsData/testsData';
import TestInfoSearchForm from './testsInfoSearchForm/testsInfoSearchForm';

const TestsInfo = () => {
  const [filter, setFilter] = useState(null);
  return <div>
    <TestInfoSearchForm setFilter={setFilter} />
    <TestsData filter={filter} />
  </div>;
};

export default TestsInfo;

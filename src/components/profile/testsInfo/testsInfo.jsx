import React from 'react';
import { useState } from 'react';
import TestsData from './testsData/testsData';
import TestInfoSearchForm from './testsInfoSearchForm/testsInfoSearchForm';

const TestsInfo = () => {
  const [filter, setFilter] = useState(null);
  return <div>
    <div>
      <TestInfoSearchForm setFilter={setFilter} />
    </div>
    <div>
      <TestsData filter={filter} />
    </div>
  </div>;
};

export default TestsInfo;

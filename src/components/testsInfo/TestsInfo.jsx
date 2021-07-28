import React, { useState } from 'react';
import TestsData from './TestsData/TestsData';
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

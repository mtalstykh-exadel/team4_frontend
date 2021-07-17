import React from 'react';
import Layout from '../../components/layout/Layout';
import EditTestsSelector from '../../components/EditTestsSelector/EditTestsSelector';

const EditTests = () => {
  return (
    <Layout>
      {/* Header*/}
      <div>
        <EditTestsSelector />
      </div>
      {/* <div>
        <QuestionData/>
      </div> */}
    </Layout>

  );
};

export default EditTests;

import React from 'react';
import './Profile.scss';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import TestsInfo from '../../components/TestsInfo/TestsInfo';
import Layout from '../../components/Layout/Layout';

const Profile = () => {
  return (
    <Layout>
      <div className='profileRow'>
        <ProfileInfo />
        <TestsInfo />
      </div>
    </Layout>
  );
};

export default Profile;

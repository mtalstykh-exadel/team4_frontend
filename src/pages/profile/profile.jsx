import React from 'react';
import './profile.scss';
import ProfileInfo from '../../components/ProfileInfo/profileInfo';
import TestsInfo from '../../components/testsInfo/TestsInfo';
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

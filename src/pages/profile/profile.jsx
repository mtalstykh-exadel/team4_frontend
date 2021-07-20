import React from 'react';
import './profile.scss';
import ProfileInfo from '../../components/ProfileInfo/profileInfo';
import TestsInfo from '../../components/testsInfo/TestsInfo';

const Profile = () => {
  return (
    <>
      <div className='profileRow'>
        <ProfileInfo />
        <TestsInfo />
      </div>
    </>
  );
};

export default Profile;

import React from 'react';
import './profile.scss';
import ProfileInfo from '../../components/profile/profileInfo/profileInfo';
import TestsInfo from '../../components/profile/testsInfo/testsInfo';

const Profile = () => {
  return <>
    <div className='profileRow'>
      <ProfileInfo />
      <TestsInfo />
    </div>
  </>;
};

export default Profile;

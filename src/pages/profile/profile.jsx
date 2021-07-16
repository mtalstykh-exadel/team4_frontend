import React from 'react';
import './profile.scss';
import ProfileInfo from '../../components/profile/profileInfo/profileInfo';
import TestsInfo from '../../components/profile/testsInfo/testsInfo';
// import DemoJWT from '../jwt/jwt';

const Profile = () => {
  return <>
    {/* Header */}
    <div className='profileRow'>
      <ProfileInfo />
      <TestsInfo />
      {/* <DemoJWT /> */}
    </div>
  </>;
};

export default Profile;

import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import './profileInfo.scss';

const ProfileInfo = () => {

  const avatar = useSelector((state) => state.profile.avatar);
  const fullname = useSelector((state) => state.profile.fullname);
  const occupation = useSelector((state) => state.profile.occupation);
  const email = useSelector((state) => state.profile.email);

  return <div className='profileInfo'>
    {avatar ? avatar : <Avatar className='avatar1' style={{ height: 80, width: 80 }} />}
    <div className='profileData'>
      <h2 className='fullname'>{fullname ? fullname : null}</h2>
      <p className='occupation'>{occupation ? occupation : null}</p>
      <p className='email'><b>Email:</b> {email ? email : null}</p>
    </div>
  </div>;
};

export default ProfileInfo;

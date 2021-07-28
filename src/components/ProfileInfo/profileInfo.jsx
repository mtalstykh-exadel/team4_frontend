import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import './ProfileInfo.scss';

const ProfileInfo = () => {

  const avatar = useSelector((state) => state.profile.avatar);
  const fullname = useSelector((state) => state.jwt.name);
  const email = useSelector((state) => state.jwt.sub);

  return (
    <div className='profileInfo'>
      {avatar ? <img src={avatar} className='avatar' /> : <Avatar className='defaultAvatar' />}
      <div className='profileData'>
        {fullname ? <h2 className='fullname'>{fullname}</h2> : null}
        {email ? <p className='email'> <b>E-mail: </b>{email} </p> : null}
      </div>
    </div>
  );
};

export default ProfileInfo;

import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import './profileInfo.scss';

const ProfileInfo = () => {
  const avatar = useSelector((state) => state.profile.avatar);
  const fullname = useSelector((state) => state.profile.fullname);
  const occupation = useSelector((state) => state.profile.occupation);
  const email = useSelector((state) => state.profile.email);

  return (
    <div className='profileInfo'>
      {avatar ? <img src={avatar} className='avatar' /> : <Avatar className='defaultAvatar' />}
      <div className='profileData'>
        {fullname ? <h2 className='fullname'>{fullname}</h2> : null}
        {occupation ? <p className='occupation'>{occupation}</p> : null}
        {email ? <p className='email'> <b>E-mail: </b>{email} </p> : null}
      </div>
    </div>
  );
};

export default ProfileInfo;

import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';

const ProfileInfo = () => {
  const avatar = useSelector((state) => state.profile.avatar);
  const fullname = useSelector((state) => state.profile.fullname);
  const occupation = useSelector((state) => state.profile.occupation);
  const email = useSelector((state) => state.profile.email);

  return <div>
    <h2>{avatar ? fullname : <Avatar></Avatar>}</h2>
    <h2>{fullname ? fullname : 'Fullname'}</h2>
    <h3>{occupation ? occupation : 'Occupation'}</h3>
    <h3>{email ? email : 'Email'}</h3>
  </div>;
};

export default ProfileInfo;

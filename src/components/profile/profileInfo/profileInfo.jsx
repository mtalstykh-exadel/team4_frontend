import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './profileInfo.scss';

const ProfileInfo = () => {
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      margin: '5px 46px 0 0',
      float: 'left',
    },
  }));

  const classes = useStyles();

  const avatar = useSelector((state) => state.profile.avatar);
  const fullname = useSelector((state) => state.profile.fullname);
  const occupation = useSelector((state) => state.profile.occupation);
  const email = useSelector((state) => state.profile.email);

  return <div className='profileInfo'>
    {avatar ? fullname : <Avatar className={classes.large} />}
    <div className='profileData'>
      <h2 className = 'fullname'>{fullname ? fullname : 'Fullname'}</h2>
      <p className = 'occupation'>{occupation ? occupation : 'Occupation'}</p>
      <p className = 'email'><b>Email:</b> {email ? email : 'example@mail.ru'}</p>
    </div>
  </div>;
};

export default ProfileInfo;

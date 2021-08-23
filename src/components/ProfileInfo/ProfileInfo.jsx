import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { Trans } from '@lingui/macro';
import './ProfileInfo.scss';

const ProfileInfo = () => {

  const avatar = useSelector((state) => state.jwt.avatar);
  const fullname = useSelector((state) => state.jwt.name);
  const email = useSelector((state) => state.jwt.sub);
  const role = useSelector((state) => state.jwt.role);

  return (

    <div className='profileInfo'>
      {avatar ? <img src={avatar} className='avatar' /> : <Avatar className='defaultAvatar' />}
      <div className='profileData'>
        {fullname ? <h2 className='fullname'>{fullname}</h2> : null}
        {email ? <p className='email'> <b><Trans>E-mail: </Trans></b> {email}</p> : null}
        {role ? <p className='role'> <b><Trans>Role:</Trans></b>
          {role === 'ROLE_COACH' ? (<Trans>coach</Trans>) : null}
          {role === 'ROLE_HR' ? (<Trans>HR-manager</Trans>) : null}
          {role === 'ROLE_USER' ? (<Trans>user</Trans>) : null}
          {role === 'ROLE_ADMIN' ? (<Trans>admin</Trans>) : null}
        </p> : null}
      </div>
    </div>
  );
};

export default ProfileInfo;

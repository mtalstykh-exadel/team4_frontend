import React from 'react';
import ProfileInfo from '../../components/profile/profileInfo/profileInfo';
import DemoJWT from '../jwt/jwt';

const Profile = () => {
  return <>
		{/* Header */}
		<div>
			User ROW
			<ProfileInfo />
			<DemoJWT />
		</div>
	</>;
};

export default Profile;

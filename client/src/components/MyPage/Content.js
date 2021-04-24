import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

const Content = () => {
  const profileData = useSelector(state => state.user.profile);

  return (
    <div>
      <UserProfile profileData={profileData} />
    </div>
  );
};

export default Content;

import React from 'react';
import { useSelector } from 'react-redux';
import { FeedHeader } from 'styles/typography';
import UserProfile from './UserProfile';

const Content = () => {
  const profileData = useSelector(state => state.user.profile);

  return (
    <div>
      <FeedHeader>
        <h2>내 프로필</h2>
      </FeedHeader>
      {/* <UserProfile profileData={profileData} /> */}
    </div>
  );
};

export default Content;

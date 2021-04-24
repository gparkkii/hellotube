import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from 'components/MyPage/UserProfile';

const CompleteForm = () => {
  const profileData = useSelector(state => state.profile);
  return (
    <>
      <UserProfile profileData={profileData} readOnly />
    </>
  );
};

export default CompleteForm;

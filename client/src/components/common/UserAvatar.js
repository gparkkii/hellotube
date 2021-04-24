import React from 'react';
import { Avatar, AvatarImage, BlankBox, BlankName } from 'styles/form/styles';
import { useColorMaker } from 'hooks/useColorMaker';

const UserAvatar = ({ width, fontSize, profileData }) => {
  const [BlankBg, BlankColor] = useColorMaker(profileData.hashedEmail);

  return (
    <Avatar width={width}>
      {profileData?.profileImageType === 'blank' ? (
        <BlankBox>
          <AvatarImage
            backgroundColor={BlankBg}
            src={profileData?.profileImage}
            alt={`${profileData?.name}'s profile`}
          />
          <BlankName color={BlankColor} fontSize={fontSize}>
            {profileData?.nickname.substring(0, 2)}
          </BlankName>
        </BlankBox>
      ) : (
        <AvatarImage
          src={profileData?.profileImage}
          alt={`${profileData?.name}'s profile`}
        />
      )}
    </Avatar>
  );
};

export default UserAvatar;

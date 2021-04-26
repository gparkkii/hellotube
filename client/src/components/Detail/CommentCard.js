import React from 'react';
import styled from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';

const CommentCard = () => {
  return (
    <CardBox>
      <UserAvatar width="40px" fontSize="14px" />
      CommentCard
    </CardBox>
  );
};

export default CommentCard;

const CardBox = styled.div`
  padding: 15px 0px;
`;

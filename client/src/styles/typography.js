import styled from 'styled-components';

export const MainTitle = styled.h2`
  font-size: 56px;
  font-weight: 500;
`;

export const LogoTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  & img {
    width: 36px;
    margin-right: 4px;
  }
`;

export const ContentTitle = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.p`
  color: #de506b;
  font-size: 13px;
  padding: 4px 0px 0px 4px;
  &:before {
    display: inline;
    content: '⚠ ';
  }
`;

export const InputAlert = styled.p`
  color: #999;
  font-size: 13px;
  margin: 8px;
  text-align: left;
  &:before {
    display: inline;
    content: '※ ';
  }
`;

export const AlertMessage = styled.p`
  color: #eb5650;
  font-size: 14px;
  width: 100%;
  text-align: center;
`;

export const UserTitle = styled.h2`
  color: #353535;
  font-size: 22px;
  font-weight: 500;
  margin-left: 4px;
  & strong {
    color: #eb5650;
    font-weight: 600;
  }
`;

export const ProfileTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin: 28px 0px;
  & strong {
    color: #eb5650;
  }
`;

export const LinkFont = styled.a`
  color: #2b80f2;
  font-weight: 500;
`;

export const SmallMessage = styled.div`
  width: 100%;
  color: #505050;
  font-size: 15px;
  text-align: center;
  padding: 4px 0px;
`;

export const FeedHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  & h2 {
    font-size: 22px;
    font-weight: 600;
  }
`;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Menu,
  Home,
  FindInPage,
  Subscriptions,
  AllInbox,
  AddAPhoto,
  PermMedia,
  Favorite,
  Message,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const SideBar = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <SideMenu>
      <IconButton
        aria-label="side-menu"
        onClick={e => {
          e.preventDefault();
          setisOpen(!isOpen);
        }}
      >
        <Menu />
      </IconButton>
      <BarMenu isOpen={isOpen}>
        <List isOpen={isOpen}>
          <NavLink exact to="/" activeClassName="side-active">
            <Home />
            <span>홈</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/explore" activeClassName="side-active">
            <FindInPage />
            <span>탐색</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/subscribe" activeClassName="side-active">
            <Subscriptions />
            <span>구독</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/myvideo" activeClassName="side-active">
            <AllInbox />
            <span>내 동영상</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/upload" activeClassName="side-active">
            <AddAPhoto />
            <span>동영상 업로드</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/mycomment" activeClassName="side-active">
            <Message />
            <span>내가 댓글 단 동영상</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/myfavorite" activeClassName="side-active">
            <Favorite />
            <span>내가 찜한 동영상</span>
          </NavLink>
        </List>
        <List isOpen={isOpen}>
          <NavLink to="/mybookmark" activeClassName="side-active">
            <PermMedia />
            <span>나중에 볼 동영상</span>
          </NavLink>
        </List>
      </BarMenu>
    </SideMenu>
  );
};

export default SideBar;

const SideMenu = styled.div`
  margin-left: -10px;
  & span {
    margin-right: 0px !important;
    color: ${({ theme }) => theme.textColor};
  }
`;

const BarMenu = styled.div`
  position: fixed;
  z-index: 99999;
  top: 60px;
  left: 0;
  height: 100%;
  transition: all 0.2s ease;
  width: ${props => (props.isOpen ? '232px' : '72px')};
  background-color: ${({ theme }) => theme.headerColor};
  color: ${({ theme }) => theme.iconColor};
  box-shadow: ${({ theme }) => theme.boxShadow};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

const List = styled.div`
  width: 100%;
  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
    padding: 24px;
    & span {
      font-size: 14px !important;
      font-weight: 400 !important;
      display: ${props => (props.isOpen ? 'block' : 'none')};
    }
    & svg {
      margin-top: -2px;
      margin-right: 22px;
    }
    &: hover {
      background-color: ${({ theme }) => theme.inputFilled};
    }
  }
  & .side-active {
    & span {
      color: #db2b25;
    }
    color: #db2b25;
    background-color: ${({ theme }) => theme.inputFilled};
  }
`;

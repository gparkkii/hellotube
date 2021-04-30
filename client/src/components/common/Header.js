import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTheme } from 'context/themeProvider';
import { AddAPhoto, AllInbox, Search } from '@material-ui/icons';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import ThemeToggle from './ThemeToggle';
import AuthHeader from './AuthHeader';
import SideBar from './SideBar';

const Header = () => {
  const theme = createMuiTheme();
  const isAuth = useSelector(state => state.user.data.isAuth);
  const [ThemeMode, toggleTheme] = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <StyledHeader>
        <nav>
          {isAuth && <SideBar />}
          <NavLink to="/">
            <img src={logo} alt="logo" />
            <p>HelloTube</p>
          </NavLink>
        </nav>
        <nav>
          {!isAuth && (
            <>
              <NavLink to="/login">로그인</NavLink>
              <NavLink to="/signup">회원가입</NavLink>
            </>
          )}
          {isAuth && (
            <>
              <Tooltip title="검색">
                <IconButton aria-label="search" activeClassName="header-active">
                  <Search style={{ fontSize: 24 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="내 동영상">
                <NavLink
                  exact
                  to="/feed/myvideo"
                  activeClassName="header-active"
                >
                  <IconButton
                    aria-label="playlist"
                    activeClassName="header-active"
                  >
                    <AllInbox style={{ fontSize: 24 }} />
                  </IconButton>
                </NavLink>
              </Tooltip>
              <Tooltip title="동영상 업로드">
                <NavLink exact to="/upload" activeClassName="header-active">
                  <IconButton aria-label="upload">
                    <AddAPhoto style={{ fontSize: 23.5 }} />
                  </IconButton>
                </NavLink>
              </Tooltip>
              <AuthHeader />
            </>
          )}
          <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
        </nav>
      </StyledHeader>
    </ThemeProvider>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  z-index: 99999;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 15px;
  font-weight: 500;
  padding: 0px 24px;
  background-color: ${({ theme }) => theme.headerColor};
  & nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    & a {
      display: flex;
      flex-direction: row;
      align-items: center;
      & h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0px 8px;
      }
      & p {
        font-size: 20px;
        line-height: 60px;
        font-weight: 600;
        color: #f02330;
      }
      & img {
        width: 32px;
        margin-right: 4px;
      }
    }
    & button {
      color: ${({ theme }) => theme.textColor};
      & svg {
        vertical-align: middle;
      }
    }
  }
`;

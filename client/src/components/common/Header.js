import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from 'context/themeProvider';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import { AddAPhoto, AllInbox, Search } from '@material-ui/icons';
import ThemeToggle from './ThemeToggle';
import AuthHeader from './AuthHeader';

const Header = () => {
  const isAuth = useSelector(state => state.user.data.isAuth);
  const [ThemeMode, toggleTheme] = useTheme();

  return (
    <StyledHeader>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo" />
          <p>HelloTube</p>
        </Link>
      </nav>
      <nav>
        {!isAuth && (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
        {isAuth && (
          <>
            <span>
              <Search style={{ fontSize: 24 }} />
            </span>
            <span>
              <AllInbox style={{ fontSize: 24 }} />
            </span>
            <Link to="/upload">
              <AddAPhoto style={{ fontSize: 23.5 }} />
            </Link>
            <AuthHeader />
          </>
        )}
        <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
      </nav>
    </StyledHeader>
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
  border-bottom: ${({ theme }) => theme.borderColor};
  & nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    & a {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 20px;
      & h2 {
        font-size: 28px;
        font-weight: 600;
        margin: 0px 8px;
      }
      & p {
        font-size: 18px;
        font-weight: 600;
        color: #f02330;
      }
      & img {
        width: 30px;
        margin-right: 4px;
      }
    }
    & span {
      margin-right: 20px;
      & svg {
        vertical-align: middle;
      }
    }
  }
`;

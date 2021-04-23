import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'modules/actions/user';
import { useTheme } from 'context/themeProvider';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.data.isAuth);
  const [ThemeMode, toggleTheme] = useTheme();

  const onClickHandler = useCallback(() => {
    dispatch(logoutUser()).then(response => {
      console.log(response);
    });
  }, []);

  return (
    <StyledHeader>
      <nav>
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
            <NavLink to="/mypage">마이페이지</NavLink>
            <NavLink to="/">
              <button type="submit" onClick={onClickHandler}>
                로그아웃
              </button>
            </NavLink>
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
  }
`;

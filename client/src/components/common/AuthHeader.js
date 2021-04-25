import React, { useCallback, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'modules/actions/user';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import UserAvatar from './UserAvatar';

const StyledMenu = withStyles({
  paper: {
    backgroundColor: 'transparent',
    marginTop: '-6px',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const AuthHeader = () => {
  const dispatch = useDispatch();

  const profileData = useSelector(state => state.user.profile);
  const [anchorEl, setAnchorEl] = useState(null);

  const onClickHandler = useCallback(() => {
    dispatch(logoutUser()).then(response => {
      console.log(response);
    });
  }, []);

  const handleClick = e => {
    e.preventDefault();
    if (!anchorEl) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const handleClose = e => {
    e.preventDefault();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        type="button"
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        <UserAvatar width="32px" fontSize="14px" profileData={profileData} />
      </IconButton>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ContentBox>
          <StyledMenuItem onClick={handleClose}>
            <Link to="/mypage">
              <button type="button">내 프로필</button>
            </Link>
          </StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>
            <Link to="/">
              <button type="submit" onClick={onClickHandler}>
                로그아웃
              </button>
            </Link>
          </StyledMenuItem>
        </ContentBox>
      </StyledMenu>
    </>
  );
};

export default withRouter(AuthHeader);

const ContentBox = styled.div`
  background-color: ${({ theme }) => theme.contentBox};
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 148px;
  & li {
    height: 48px;
    padding: 10px;
    border-bottom: ${({ theme }) => theme.borderColor};
    & a {
      & button {
        font-size: 15px;
      }
    }
  }
`;

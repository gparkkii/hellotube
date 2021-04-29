import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

function ThemeToggle({ toggle, mode }) {
  return (
    <Tooltip
      title={mode === 'dark' ? '라이트 모드로 바꾸기' : '다크 모드로 바꾸기'}
    >
      <ThemeButton type="button" onClick={toggle} mode={mode}>
        {mode === 'dark' ? '🌝 white' : 'dark 🌚'}
      </ThemeButton>
    </Tooltip>
  );
}

export default ThemeToggle;

const ThemeButton = styled.button`
  width: 84px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.textColor};
  border-radius: 30px;
  font-size: 15px;
  margin-left: 4px;
  color: ${({ theme }) => theme.textColor};
`;

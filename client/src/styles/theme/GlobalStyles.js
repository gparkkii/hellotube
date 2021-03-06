import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 1.5;
    letter-spacing: -0.01;
    margin: 0 auto;
    font-family:
      "Assistant",
      "Helvetica Neue",
      "Noto Sans",
      "Noto Sans CJK KR",
      sans-serif;
    word-break: keep-all;
    word-wrap: break-word;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    transition: all 0.2s ease;
  }

  button {
    transition: all 0.2s ease;
    color: ${({ theme }) => theme.textColor};
  }

  input {
    text-decoration: none;
    background-color: none;
    outline: none;
    transition: all 0.2s ease;
    color: ${({ theme }) => theme.textColor};
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) => theme.textColor};
  }
`;

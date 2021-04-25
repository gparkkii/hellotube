import { css } from 'styled-components';

export const media = {
  mobile: (...args) => css`
    @media (max-width: 385px) {
      ${css(...args)}
    }
  `,
  mini: (...args) => css`
    @media (max-width: 680px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (max-width: 1280px) {
      ${css(...args)}
    }
  `,
};

// import { css } from 'styled-components';

// export const media = {
//   mobile: (...args) => css`
//     @media (min-width: 361px) {
//       ${css(...args)}
//     }
//   `,
//   tablet: (...args) => css`
//     @media (min-width: 601px) {
//       ${css(...args)}
//     }
//   `,
//   desktop: (...args) => css`
//     @media (min-width: 1200px) {
//       ${css(...args)}
//     }
//   `,
// };

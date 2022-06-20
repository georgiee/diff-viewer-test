// globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :host {
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap');
    font-family: 'Roboto Mono', monospace;
  }
`;


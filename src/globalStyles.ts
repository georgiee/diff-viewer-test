// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export const GlobalStyle = createGlobalStyle`
  ${dom.css()}
  
  :host {
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200&display=swap');
    font-family: 'Roboto Mono', monospace;
  }
`;


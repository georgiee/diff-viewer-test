// globalStyles.js
import { createGlobalStyle } from 'styled-components';

import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export const GlobalStyle = createGlobalStyle`
  ${dom.css()}
  
  :host {
    font-family: 'Roboto Mono', monospace;
    position: relative;
  }
`;


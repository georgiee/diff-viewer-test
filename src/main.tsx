import React from 'react';

import { App } from "./app"
import { createRootWithShadowDom } from './create-root-with-shadow-dom';

let DiffConfig: any = {};

function injectStylesheet(source) {
  const link = document.createElement( "link" );
  link.href = source
  link.type = "text/css";
  link.rel = "stylesheet";
  link.media = "screen";
  
  return link
}

function injectFontawesome(otherRoot: Document) {
  let target = otherRoot || document.getElementsByTagName( "head" )[0];

  let materialIcons = injectStylesheet("https://fonts.googleapis.com/icon?family=Material+Icons")
  target.appendChild(materialIcons)

  const robotFont = injectStylesheet("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap")
  target.appendChild(robotFont)
}

export default {
  config: function(config){
    DiffConfig = config;
  },
  attach: (element, instanceConfig = {}) => {
    const config = { ...DiffConfig, ...instanceConfig};
    const root = createRootWithShadowDom(element, shadowRoot => {
      injectFontawesome(shadowRoot);
    }); // createRoot(container!) if you use TypeScript
    root.render(<App config={config}/>);
  }
}

import React from 'react';
import "./utils/initializeFontAwesome";

import { createRootWithShadowDom } from './utils/create-root-with-shadow-dom';
import { App } from './app';
import { api } from './api';

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

  // ⚠️ Warning boostrap 5.2 relies on css variables btu they use :root instead of :host so they do not get populated
  // right now the rails host also loads the same css so it should be fine as css variables bleed into the shadow dom
  const bootstrap = injectStylesheet("https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css")
  target.appendChild(bootstrap)
}

export default {
  config: function(config){
    DiffConfig = config;
  },
  attach: (element, instanceConfig = {}) => {
    const config = { ...DiffConfig, ...instanceConfig};
    api.defaults.baseURL = config.API_BASE
    api.defaults.headers.common['Authorization'] = 'Bearer '+ config.token;

    const root = createRootWithShadowDom(element, shadowRoot => {
      injectFontawesome(shadowRoot);
    }); // createRoot(container!) if you use TypeScript
    root.render(<App config={config}/>);
  }
}

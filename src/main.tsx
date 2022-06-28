import React from 'react';

import { App } from "./app"
import { createRootWithShadowDom } from './create-root-with-shadow-dom';

let DiffConfig: any = {};

export default {
  config: function(config){
    DiffConfig = config;
  },
  attach: (element) => {
    const config = DiffConfig;
    const root = createRootWithShadowDom(element); // createRoot(container!) if you use TypeScript
    root.render(<App config={config}/>);
  }
}

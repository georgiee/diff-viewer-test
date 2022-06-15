import { createRoot } from 'react-dom/client';
import React from 'react';

import { App } from "./app"

let DiffConfig: any = {};
console.log('DiffViewer starting up');

export default {

  config: function(config){
    DiffConfig = config;
  },
  attach: (element) => {
    const config = DiffConfig;
    const root = createRoot(element); // createRoot(container!) if you use TypeScript
    root.render(<App config={config}/>);
  }
}



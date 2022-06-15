import { createRoot } from 'react-dom/client';
import React from 'react';

import {App} from "./app"


var DiffConfig = {};
console.log('DiffViewer starting up');

export default {

  config: function(config){
    DiffConfig = config;
  },
  attach: (element) => {
  	console.log('attach diff', element)
  	console.log('using config', DiffConfig)	
    
    const root = createRoot(element); // createRoot(container!) if you use TypeScript
    root.render(<App/>);
  }
}



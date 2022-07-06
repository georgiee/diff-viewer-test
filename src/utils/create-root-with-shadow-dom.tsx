import { createRoot } from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import React from 'react';

/**
 * Render a given React app plus the styled component styles inside a shadow dom
 * to prevent any styles bleeding into our component.
 * 
 * Idea from https://www.wpeform.io/blog/render-react-app-shadow-dom-styled-components/
 * Thank you ✨
 * 
 * I wrapped the approach in a convenient function to easily render any root wrapped by a shadow dom.
 */


export const createRootWithShadowDom = (element, initFn: Function) => {
  const shadowRoot = element.attachShadow({ mode: 'open' });

  const root = createRoot(shadowRoot);
  initFn && initFn(shadowRoot);
  
  return {
    render: (children) => {
      root.render(
        <StyleSheetManager target={shadowRoot}>
          {children}
        </StyleSheetManager>
      )
    }
  }
}

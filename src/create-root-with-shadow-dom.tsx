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

export const createRootWithShadowDom = (element) => {
  const shadow = element.attachShadow({ mode: 'open' });

  const styleSlot = document.createElement('section');
  const renderIn = document.createElement('div');

  shadow.appendChild(styleSlot);
  styleSlot.appendChild(renderIn);

  const root = createRoot(shadow);

  return {
    render: (children) => {
      root.render(
        <StyleSheetManager target={styleSlot}>
          {children}
        </StyleSheetManager>
      )
    }
  }
}

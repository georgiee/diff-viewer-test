import React from 'react';
import { DiffViewer } from './components/diff-viewer/DiffViewer';

import { GlobalStyle } from './globalStyles';
import { DiffProvider } from './components/diff-viewer/DiffContext';


export function App({config: {API_BASE, diffId, token}}){
 return (
   <DiffProvider config={{apiBaseUrl: API_BASE, diffId, token}}>
     <GlobalStyle />
     <DiffViewer/>
   </DiffProvider>
 )
}



import React from 'react';
import { DiffViewer } from './components/diff-viewer/DiffViewer';

import { GlobalStyle } from './globalStyles';
import { DiffProvider } from './components/providers/DiffContext';
import { AnnotationProvider } from './components/providers/AnnotationContext';


export function App({config: {API_BASE, diffId, token, mode}}){
  console.log("mode", mode)
  
  return (
   <DiffProvider config={{apiBaseUrl: API_BASE, diffId, token, mode}}>
     <AnnotationProvider>
       <GlobalStyle />
       <DiffViewer/>
     </AnnotationProvider>
   </DiffProvider>
 )
}



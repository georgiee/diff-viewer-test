import React from 'react';
import { DiffViewer } from './components/diff-viewer/DiffViewer';

import { GlobalStyle } from './globalStyles';
import { DiffProvider } from './components/providers/DiffContext';
import { NotesProvider } from './components/providers/NotesContext';
import { createApiClient } from './api';

export function App({config: {API_BASE, diffId, token, mode, reviewId}}){
  const apiClient = createApiClient({base: API_BASE, token: token });

  return (
    <NotesProvider apiClient={apiClient} reviewId={reviewId} diffId={diffId} mode={mode}>
      <DiffProvider apiClient={apiClient} diffId={diffId} mode={mode}>
        <GlobalStyle />
        <DiffViewer/>
      </DiffProvider>   
    </NotesProvider>
   
 )
}



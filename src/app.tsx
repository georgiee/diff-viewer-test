import React from 'react';
import { DiffViewer } from './diff-viewer/DiffViewer';

import { GlobalStyle } from './globalStyles';
import { DiffProvider } from './diff-viewer/DiffContext';
import { createApiClient } from './api/base';
import styled from 'styled-components';
import { NoteRenderer } from './components/notes/NoteRenderer';
import { NotesProvider } from './components/providers/NotesContext';
import { DiffMode } from './types';
import { DiffAnnotation } from './annotation/DiffAnnotation';


const Debug = styled.div`
  text-align: right;
  margin-bottom: 10px;
`

export function App({config: {API_BASE, diffId, token, mode, reviewId}}){
  const apiClient = createApiClient({base: API_BASE, token: token });

  if(mode == DiffMode.ANNOTATION) {
    return <DiffAnnotation {...{API_BASE, diffId, token, mode, reviewId}}/>
  }
  
  return (
    <NotesProvider apiClient={apiClient} reviewId={reviewId} diffId={diffId} mode={mode}>
      <DiffProvider apiClient={apiClient} diffId={diffId} mode={mode} lineRenderer={NoteRenderer as any}>
        <GlobalStyle />
        
        <Debug>
          <span className="badge rounded-pill text-bg-info">{mode}</span>
          { diffId && <span className="badge rounded-pill text-bg-dark">Diff: {diffId}</span>}
          { reviewId && <span className="badge rounded-pill text-bg-dark">Review: {reviewId}</span>}
        </Debug>
        
        <DiffViewer/>
      </DiffProvider>
    </NotesProvider>
  )
}



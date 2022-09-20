import React from 'react';
import { DiffProvider } from '../diff-viewer/DiffContext';
import { GlobalStyle } from '../globalStyles';
import { DiffViewer } from '../diff-viewer/DiffViewer';
import { createApiClient } from '../api/base';
import styled from 'styled-components';
import { AnnotationNote } from './AnnotationNote';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const Debug = styled.div`
  text-align: right;
  margin-bottom: 10px;
`

export function DiffAnnotation({API_BASE, diffId, reviewId, mode, token}) {
  const apiClient = createApiClient({base: API_BASE, token: token });

  // Create a client
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <DiffProvider apiClient={apiClient} diffId={diffId} mode={mode} lineRenderer={AnnotationNote as any}>
        <GlobalStyle />
  
        <Debug>
          <span className="badge rounded-pill text-bg-info">{mode}</span>
          { diffId && <span className="badge rounded-pill text-bg-dark">Diff: {diffId}</span>}
          { reviewId && <span className="badge rounded-pill text-bg-dark">Review: {reviewId}</span>}
        </Debug>
        
        
        <DiffViewer/>
      </DiffProvider>
    </QueryClientProvider>
  )
}

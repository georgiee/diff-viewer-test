import React from 'react';
import { DiffProvider } from '../../diff-viewer/DiffContext';
import { GlobalStyle } from '../../globalStyles';
import { DiffViewer } from '../../diff-viewer/DiffViewer';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CommentLineRenderer } from './components/CommentLineRenderer';
import { useCommentDrafts } from './stores/drafts';
import { createApiClient } from '../../shared/api';
import { CommentGutterRenderer } from './components/CommentGutterRenderer';

const Debug = styled.div`
  text-align: right;
  margin-bottom: 10px;
`

/**
 * This basically creates a fully self-contained feature to author annotations
 * and to prevent mixing concerns between annotations (admin) and comments (applicant),
 * which makes it easier to grow on the Rails side too.
 */

export function DiffComment({API_BASE, diffId, reviewId, mode, token}) {
  const apiClient = createApiClient({base: API_BASE, token: token });
  const setReviewId = useCommentDrafts(state => state.mutations.setReviewId);

  setReviewId(reviewId);
  
  // Create a mandatory client for react query
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <DiffProvider
        apiClient={apiClient} diffId={diffId} 
        mode={mode} 
        gutterRenderer={CommentGutterRenderer}
        lineRenderer={CommentLineRenderer as any}>
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

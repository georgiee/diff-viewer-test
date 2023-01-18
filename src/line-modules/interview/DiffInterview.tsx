import React from 'react';
import { DiffProvider } from '../../diff-viewer/DiffContext';
import { GlobalStyle } from '../../globalStyles';
import { DiffViewer } from '../../diff-viewer/DiffViewer';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InterviewLineRenderer } from './components/InterviewLineRenderer';
import { useInterviewStore } from './stores/interview';
import { createApiClient } from '../../shared/api';
import { InterviewGutterRenderer } from './components/InterviewGutterRenderer';
import { isVisibleAtom, useInterview } from './hooks/useInterview';
import { useAtom } from 'jotai';

const Debug = styled.div`
  text-align: right;
  margin-bottom: 10px;
`

/**
 * This basically creates a fully self-contained feature to author annotations
 * and to prevent mixing concerns between annotations (admin) and comments (applicant),
 * which makes it easier to grow on the Rails side too.
 */

export function DiffInterview({API_BASE, diffId, reviewId, mode, token}) {
  const apiClient = createApiClient({base: API_BASE, token: token });
  const setReviewId = useInterviewStore(store => store.mutations.setReviewId);

  setReviewId(reviewId);
  
  // Create a mandatory client for react query
  const queryClient = new QueryClient()
  const [visible, toggleVisibility] = useAtom(isVisibleAtom)
  
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <button onClick={() => toggleVisibility()}>toggle all</button>
      </div>
      <DiffProvider 
        apiClient={apiClient} diffId={diffId} mode={mode}
        gutterRenderer={InterviewGutterRenderer}
        lineRenderer={InterviewLineRenderer}>
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

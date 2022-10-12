import React from 'react';
import { DiffMode } from './types';
import { DiffAnnotation } from './line-modules/annotation/DiffAnnotation';
import { DiffComment } from './line-modules/comment/DiffComment';
import { DiffInterview } from './line-modules/interview/DiffInterview';

export function App({config: {API_BASE, diffId, token, mode, reviewId}}){
  if(mode == DiffMode.ANNOTATION) {
    return <DiffAnnotation {...{API_BASE, diffId, token, mode}}/>
  }

  if(mode == DiffMode.COMMENT) {
    return <DiffComment {...{API_BASE, diffId, token, mode, reviewId}}/>
  }
  
  if(mode == DiffMode.INTERVIEW) {
    return <DiffInterview {...{API_BASE, diffId, token, mode, reviewId}}/>
  }

  return <div>mode "{mode}" unknown</div>
}

import { createAnnotationApi } from './annotation';
import { createReviewApi } from './review';
import { createInterviewApi } from './interview';
import { createDiffApi } from './diff';
import axios from 'axios';

export const api = axios.create({
  timeout: 1000
});


export {
  createAnnotationApi,
  createReviewApi,
  createInterviewApi,
  createDiffApi
}

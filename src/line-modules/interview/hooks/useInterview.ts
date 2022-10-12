import { useQuery } from '@tanstack/react-query';
import * as interviewApi from '../api/interview';

export const useInterview = (reviewId) => {
  const commentsQuery = useQuery(['interview'], () => interviewApi.fetch(reviewId))
  
  return {
    commentsQuery
  }
}

import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as questionApi from '../api/question';

export const useQuestions = () => {
  const questionsQuery = useQuery(['questions'], () => questionApi.fetchQuestions())

  return {
    questionsQuery
  }
}

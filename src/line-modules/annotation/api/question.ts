import { api } from '../../../shared/api';

export async function fetchQuestions (){
  return api.get(`/questions`).then(res => {
    return res.data
  })
}

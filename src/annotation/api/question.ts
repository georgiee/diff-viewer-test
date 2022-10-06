import { api } from '../../api';

export async function fetchQuestions (){
  return api.get(`/questions`).then(res => {
    return res.data
  })
}

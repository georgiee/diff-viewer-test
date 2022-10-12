import { api } from '../../api';

export async function fetch (reviewId){
  return api.get(`/reviews/${reviewId}/comments`).then(res => res.data)
}

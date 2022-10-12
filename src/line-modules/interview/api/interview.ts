import { api } from '../../../shared/api';

export async function fetch (reviewId){
  return api.get(`/reviews/${reviewId}/interview`).then(res => res.data)
}

import axios from 'axios';

export const api = axios.create({
  timeout: 1000
});

export const createApiClient = ({base, token}) => axios.create({
  baseURL: base,
  timeout: 1000,
  headers: {'Authorization': 'Bearer ' + token}
});
 

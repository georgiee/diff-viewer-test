import { ApiClientConfig } from './types';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const createApiClient = ({base, token}) => axios.create({
  baseURL: base,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+ token}
});

export function createDiffApi({token, diffId, apiBaseUrl}: ApiClientConfig) {
  const apiClient = createApiClient({base: apiBaseUrl, token });

  const getDiff = async () => {
    const response = await apiClient.get(`/diffs/${diffId}`)
    return response.data;
  }

  const getAnnotations = async () => {
    const response = await apiClient.get(`/diffs/${diffId}/annotations`)
    return response.data;
  }
 

  return {
    getDiff, getAnnotations
  }
}

export const useDiffApi = (config: ApiClientConfig) => {
  const diffyApi = createDiffApi(config)

  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const markup = await diffyApi.getDiff();
      const annotations = await diffyApi.getAnnotations();
  
      const data = {
        markup, annotations
      }
      
      cache.current[config.diffId] = data
      
      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [config.diffId]);

  return { status, data };
}


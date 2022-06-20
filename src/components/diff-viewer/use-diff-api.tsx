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

  const fetchDiff = async () => {
    const response = await apiClient.get(`/diffs/${diffId}`)
    return response.data;
  }

  return {
    fetchDiff
  }

}

export const useDiffApi = (config: ApiClientConfig) => {
  const diffyApi = createDiffApi(config)

  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      const data = await diffyApi.fetchDiff();
      cache.current[config.diffId] = data;

      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [config.diffId]);

  return { status, data };
}


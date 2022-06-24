import { useEffect, useRef, useState } from 'react';

export const useDiffApi = (diffId: string, diffyApi) => {
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
      
      cache.current[diffId] = data
      
      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [diffId]);

  return { status, data };
}


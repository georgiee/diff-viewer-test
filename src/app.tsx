import React, {useEffect, useState} from 'react';
import axios from 'axios';

const createApiClient = ({base, token}) => axios.create({
  baseURL: base,
  timeout: 1000,
  headers: {'Authorization': 'Bearer '+ token}
});

export function App({config: {API_BASE, diffId, token}}){
  const [diffData, setDiffData] = useState(null);
  const [error, setError] = useState(null);
  
  const apiClient = createApiClient({base: API_BASE, token });
  
  const API = `/diffs/${diffId}`

  useEffect(async () => {
    try {
      const response = await apiClient.get(API)
      setDiffData(response.data);
    }catch (apiError: any) {
      console.log()
      setError(apiError.response.data.error)
    }
  }, [])

  if (diffData) {
    return <code>{diffData.source}</code>;
  } else {
    if(error){
      return <div style={{color: 'red'}}>⚠️ error loading the given diff, reasons: <br/> {error}</div>;
    }else {
      return <div>loading diff daya</div>;
    }
  }
}

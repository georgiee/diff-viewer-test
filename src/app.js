import React, {useEffect, useState} from 'react';
import axios from 'axios';

export function App({config: {API_BASE, diffId, token}}){
  const [diffData, setDiffData] = useState(null);
  const [error, setError] = useState(null);
  
  const API = `/diffs/${diffId}`
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await apiClient.get(API)
        setDiffData(response.data);  
      }catch (apiError) {
        console.log()
        setError(apiError.response.data.error)
      }
      
    };

    fetchData();
  }, [])

  const apiClient = axios.create({
    baseURL: API_BASE,
    timeout: 1000,
    headers: {'Authorization': 'Bearer '+ token}
  });

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

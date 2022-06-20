import React from 'react';
import { DiffViewer } from './components/diff-viewer/DiffViewer';
import { useDiffApi } from './api';

import { GlobalStyle } from './globalStyles';


export function App({config: {API_BASE, diffId, token}}){
  const {data, status} = useDiffApi({apiBaseUrl: API_BASE, diffId, token})

 const renderDiff = () => {
   if(status === 'error'){
     return <div style={{color: 'red'}}>⚠️ error loading the given diff</div>;
   }else {
     if (status === 'fetched') {
       return <DiffViewer data={data}/>
     }else {
       return <div>loading diff daya</div>;
     }
   }
 }
 
 return (
   <>
     <GlobalStyle />
     {renderDiff()}
   </>
 )
}



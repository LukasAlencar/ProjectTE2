import axios from 'axios';
import { useEffect, useState } from 'react'



function useGetApi() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const post = async (url, postData) => {
      setLoading(true);
      
        await axios.post(url, postData).then(response => {
          setData(response.data)
          setError(null);
        }).catch(error => setError(error))
        .finally(()=>{
          setLoading(false)
        })
        
      
    };
  
    return { data, loading, error, post };
  }
  
  export default useGetApi;
import { useState } from 'react';
import { request } from './http';

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUrl = (url) => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST;
    const apiUrl = url.startsWith('http') ? url : `${host}${url}`;
    return apiUrl;
  };

  const makeRequest = async ({ url, method, body, media = false, mapper = null }) => {
    setLoading(true);
    const res = await request({ url: getUrl(url), method, body, media, mapper });
    setResponse(res);
    setError(!res.ok);
    setLoading(false);
    return res;
  };

  return { error, loading, makeRequest, response };
};

export default useFetch;

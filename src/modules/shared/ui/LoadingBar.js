import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeError', handleEnd);
    router.events.on('routeChangeComplete', handleEnd);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeError', handleEnd);
      router.events.off('routeChangeComplete', handleEnd);
    };
  }, []);
  return loading ? <LinearProgress /> : null;
};

export default LoadingBar;

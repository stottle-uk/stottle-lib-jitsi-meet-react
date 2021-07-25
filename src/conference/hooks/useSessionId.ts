import { useMemo } from 'react';

export const useSessionId = () => {
  const sessionId = useMemo(() => {
    const url = new URL(document.location.href);
    const paths = url.pathname
      .split('/')
      .filter(p => p !== 'studio')
      .filter(p => p);

    return paths[0];
  }, []);

  return {
    sessionId
  };
};

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const session = sessionStorage.getItem('adminSession');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          const expiresAt = new Date(parsed.expiresAt);
          if (expiresAt > new Date()) {
            setIsLoggedIn(true);
          } else {
            sessionStorage.removeItem('adminSession');
            setIsLoggedIn(false);
          }
        } catch {
          setIsLoggedIn(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isLoggedIn, isLoading };
};

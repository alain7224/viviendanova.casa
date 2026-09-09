import { useEffect, useState } from 'react';

export const useScrollDepth = () => {
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const depth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;
      setScrollDepth(depth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDepth;
};

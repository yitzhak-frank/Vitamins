import { useState, useEffect } from 'react';

const useScrollPositionBottom = () => {
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);
    const pageHeight   = document.body.clientHeight;
    const screenHeight = document.documentElement.clientHeight

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return pageHeight - (screenHeight + scrollPosition);
}

export default useScrollPositionBottom;

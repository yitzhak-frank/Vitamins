import { useState, useEffect } from 'react';

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);
    const pageHeight   = document.body.clientHeight;
    const screenHeight = document.documentElement.clientHeight

    useEffect(() => {
        const handleScroll = () => setScrollPosition(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return ({top: scrollPosition, bottom: pageHeight - (screenHeight + scrollPosition)});
}

export default useScrollPosition;

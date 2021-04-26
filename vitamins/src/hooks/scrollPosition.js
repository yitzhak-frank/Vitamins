import { useState, useEffect } from 'react';

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);
    const handleScroll = () => setScrollPosition(window.scrollY);

    let pageHeight       = document.body.clientHeight;
    const screenHeight   = document.documentElement.clientHeight
    const resizeObserver = new ResizeObserver(entries => pageHeight = entries[0].target.clientHeight);
    
    useEffect(() => {
        resizeObserver.observe(document.body)
        window.addEventListener('scroll', handleScroll);
        return () => {
            resizeObserver.unobserve(document.body);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return ({top: scrollPosition, bottom: pageHeight - (screenHeight + scrollPosition)});
}

export default useScrollPosition;

import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const isFirstRoute = useRef(true);

    useLayoutEffect(() => {
        const section = hash ? document.getElementById(hash.slice(1)) : null;
        if (section) {
            section.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }

        if (isFirstRoute.current) {
            isFirstRoute.current = false;
            return;
        }

        document.getElementById('main-content')?.focus({ preventScroll: true });
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;

import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const isFirstRoute = useRef(true);

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        if (isFirstRoute.current) {
            isFirstRoute.current = false;
            return;
        }

        document.getElementById('main-content')?.focus({ preventScroll: true });
    }, [pathname]);

    return null;
}

export default ScrollToTop;

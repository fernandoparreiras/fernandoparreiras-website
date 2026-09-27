import { useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const previousPathname = useRef(pathname);

    useLayoutEffect(() => {
        const section = hash ? document.getElementById(hash.slice(1)) : null;
        if (section) {
            section.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }

        if (previousPathname.current !== pathname) {
            document.getElementById('main-content')?.focus({ preventScroll: true });
        }
        previousPathname.current = pathname;
    }, [pathname, hash]);

    return null;
}

export default ScrollToTop;

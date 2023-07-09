import { useEffect, useState } from 'react';

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
}

const useIsInViewport = (ref) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
    }

    useEffect(() => {
        const value = ref.current;

        const observer = new IntersectionObserver(callbackFunction, options);

        if (value) observer.observe(ref.current);

        return () => {
            if (value) observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}

export default useIsInViewport;
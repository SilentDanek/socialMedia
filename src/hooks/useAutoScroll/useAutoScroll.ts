import { UIEventHandler, useEffect, useRef, useState } from 'react';

export const useAutoScroll = <T extends object>(observedObject: T) => {
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const autoScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isAutoScroll) {
            autoScrollRef.current?.scrollIntoView({ behavior: 'instant' });
        }
    }, [observedObject]);

    const handleScroll: UIEventHandler<HTMLElement> = (e) => {
        const elem = e.currentTarget;
        if (elem.scrollHeight - elem.scrollTop - 100 < elem.clientHeight) {
            setIsAutoScroll(true);
        } else {
            setIsAutoScroll(false);
        }
    };

    return { handleScroll, autoScrollRef };
};

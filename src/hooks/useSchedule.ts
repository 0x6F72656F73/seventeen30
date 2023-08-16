import { useRef } from 'react';

export function useSchedule() {
    const scheduleRef = useRef<HTMLDivElement>(null);

    const triggerScroll = () => {
        setTimeout(() => {
            if (scheduleRef.current) {
                scheduleRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1);
    };

    return { scheduleRef, triggerScroll };
}

import { Hammer } from 'lucide-react';
import { useRef, useEffect } from 'react';
import styles from './UnderConstruction.module.css'

export default function UnderConstruction() {
    const rectRef = useRef<SVGRectElement>(null);

    useEffect(() => {
        if (rectRef.current) {
            const length = rectRef.current.getTotalLength();
            document.documentElement.style.setProperty('--path-total-length', length.toString());
        }
    }, []);
    return (
        <div className="grid w-full place-items-center px-10 md:w-5xl md:px-0 bg-black">
            <div className="relative flex aspect-3/4 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-4xl bg-black/5 p-2 md:aspect-video dark:bg-white/10">
                <Hammer
                    size={32}
                    strokeWidth={2}
                    className={`${styles.hammer} text-neutral-600 dark:text-neutral-300`}
                />
                <h1 className="text-2xl tracking-tight text-black/80 dark:text-white/80">Under Construction</h1>
                <svg className="absolute h-full w-full">
                    <rect
                        ref={rectRef}
                        className={`${styles.rect} h-full w-full`}
                        rx="32"
                        ry="32"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="4"
                    />
                </svg>
            </div>
        </div>
    );
}
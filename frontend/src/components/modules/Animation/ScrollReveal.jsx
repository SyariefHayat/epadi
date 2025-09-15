import { gsap } from 'gsap';
import { useEffect, useRef, useMemo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
    children,
    scrollContainerRef,
    blurStrength = 4,
    containerClassName = "",
    textClassName = "",
    blurAnimationEnd = "bottom bottom",
}) => {
    const containerRef = useRef(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="inline-block word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller =
            scrollContainerRef && scrollContainerRef.current
                ? scrollContainerRef.current
                : window;

        const wordElements = el.querySelectorAll('.word');

        gsap.fromTo(
            wordElements,
            { filter: `blur(${blurStrength}px)` },
            {
                filter: 'blur(0px)',
                ease: 'none',
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom-=20%',
                    end: blurAnimationEnd,
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [scrollContainerRef, blurStrength, blurAnimationEnd]);

    return (
        <h2 ref={containerRef} className={`${containerClassName}`}>
            <p className={`${textClassName}`}>
                {splitText}
            </p>
        </h2>
    );
};

export default ScrollReveal;
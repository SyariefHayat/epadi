import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    onStart,
    onEnd,
    suffix = "", // Tambahkan suffix di sini
}) {
    const ref = useRef(null);
    const [display, setDisplay] = useState(direction === "down" ? to : from); // State untuk angka
    const motionValue = useMotionValue(direction === "down" ? to : from);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        setDisplay(direction === "down" ? to : from);
    }, [from, to, direction]);

    useEffect(() => {
        if (isInView && startWhen) {
            if (typeof onStart === "function") {
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(
                () => {
                    if (typeof onEnd === "function") {
                        onEnd();
                    }
                },
                delay * 1000 + duration * 1000
            );

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [
        isInView,
        startWhen,
        motionValue,
        direction,
        from,
        to,
        delay,
        onStart,
        onEnd,
        duration,
    ]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            const options = {
                useGrouping: !!separator,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            };

            const formattedNumber = Intl.NumberFormat("en-US", options).format(
                latest.toFixed(0)
            );

            setDisplay(
                separator
                    ? formattedNumber.replace(/,/g, separator)
                    : formattedNumber
            );
        });

        return () => unsubscribe();
    }, [springValue, separator]);

    return (
        <span className={className} ref={ref}>
            {display}
            {suffix}
        </span>
    );
}
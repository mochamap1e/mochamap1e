import { useEffect } from "react";
import { motion, useAnimate } from "motion/react";

let controller;

export function showOverlay() { controller.show(); }
export function hideOverlay() { controller.hide(); }

export default function FadeOverlay({ initialOpacity }) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const overlay = scope.current;
        const transition = { duration: 0.8, ease: "easeInOut" };

        controller = {
            show: () => animate(overlay, { opacity: 1 }, transition),
            hide: () => animate(overlay, { opacity: 0 }, transition)
        }
    }, [scope, animate]);

    return (
        <motion.div
            ref={scope}
            className="fixed bg-black w-screen h-screen z-10"
            initial={{ opacity: initialOpacity }}
        />
    )
}
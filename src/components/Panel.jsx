import { hover, motion } from "motion/react";
import { useRef, useEffect } from "react";

export default function Panel() {
    const panelRef = useRef(null);

    const hoverSfx = new Audio("/sfx/focus.wav");
    const clickSfx = new Audio("/sfx/select.wav");

    useEffect(() => {
        const panel = panelRef.current;

        const onMouseEnter = () => { hoverSfx.currentTime = 0; hoverSfx.play(); }
        const onMouseDown = () => { clickSfx.currentTime = 0; clickSfx.play(); }
        
        if (panel) panel.addEventListener("mouseenter", onMouseEnter);
        if (panel) panel.addEventListener("mousedown", onMouseDown);

        return () => {
            if (panel) panel.removeEventListener("mouseenter", onMouseEnter);
            if (panel) panel.removeEventListener("mousedown", onMouseDown);
        }
    }, []);

    return (
        <motion.button
            ref={panelRef}
            className="bg-gray-500 outline-none"
            whileHover={{ scale: 1.1, zIndex: 1, boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 1, boxShadow: "none" }}
        ></motion.button>
    )
}
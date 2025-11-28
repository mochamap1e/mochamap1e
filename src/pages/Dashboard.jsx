import { useState, useEffect } from "react";
import { motion } from "motion/react";
import random from "random";

import FadeOverlay, { hideOverlay } from "../components/FadeOverlay";
import centerElements from "../styles/centerElements";

export default function Dashboard() {
    const [spinnerVisible, setSpinnerVisible] = useState(true);

    useEffect(() => {
        const fadeTimeout = setTimeout(() => hideOverlay(), 1000);
        const loadedTimeout = setTimeout(() => {
            setSpinnerVisible(false);
            new Audio("/sfx/home.wav").play();
        }, 2000); // random.int(4, 8) * 1000    

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(loadedTimeout);
        }
    }, []);

    return (
        <div
            className={`
                ${centerElements}
            `}>
            
            <motion.img
                src="/img/load.png"
                className={`fixed ${ spinnerVisible ? "visible" : "invisible" }`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <FadeOverlay initialOpacity={1} />
        </div>
    )
}
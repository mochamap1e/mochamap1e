import { useState, useEffect } from "react";
import { Shader, ChromaticAberration, FlowingGradient } from "shaders/react";

import { useLoudness } from "../stores";

import styles from "./Background.module.css";

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Background() {
    const [multiplier, setMultiplier] = useState(1);
    const [seed] = useState(() => randomInt(100000, 999999));
    
    const loudness = useLoudness(state => state.loudness);
    
    useEffect(() => {
        if (loudness > 1) {
            setMultiplier(loudness);
        } else {
            setMultiplier(1);
        }
    }, [loudness]);

    return (
        <Shader className={styles.shader}>
            <ChromaticAberration strength={0.05 * multiplier}>
                <FlowingGradient
                    seed={seed}
                    speed={2 * multiplier}
                    colorC="#005d8f"
                    colorD="#00b4cc"
                />
            </ChromaticAberration>
        </Shader>
    );
}
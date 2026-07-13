import { useState, useEffect } from "react";
import { Shader, ChromaticAberration, FlowingGradient } from "shaders/react";

import { useLoudness } from "../stores";

import styles from "./Background.module.css";

export function Background() {
    const [multiplier, setMultiplier] = useState(1);
    
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
                    speed={2 * multiplier}
                    colorC="#005d8f"
                    colorD="#00b4cc"
                />
            </ChromaticAberration>
        </Shader>
    );
}
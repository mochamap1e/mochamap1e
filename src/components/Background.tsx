import { useState } from "react";
import { Shader, ChromaticAberration, FlowingGradient } from "shaders/react";
import { randomInt } from "mathjs";

import styles from "./Background.module.css";

export function Background() {
    const [seed] = useState(() => randomInt(1000, 9999));

    return (
        <Shader className={styles.shader}>
            <ChromaticAberration strength={0.05}>
                <FlowingGradient
                    seed={seed}
                    speed={3}
                    colorC="#005d8f"
                    colorD="#00b4cc"
                />
            </ChromaticAberration>
        </Shader>
    );
}
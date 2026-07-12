import * as s from "shaders/react";

import styles from "./Background.module.css";

export function Background() {
    return (
        <s.Shader className={styles.shader}>
            <s.Plasma/>
            <s.Shatter/>
        </s.Shader>
    );
}
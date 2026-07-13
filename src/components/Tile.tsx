import type { ReactElement } from "react";

import styles from "./Tile.module.css";

export function Tile({ children }: { children: ReactElement[] }) {
    return (
        <div className={styles.tile}>
            {children}
        </div>
    );
}
import clsx from "clsx";

import styles from "./Tile.module.css";

export function Tile(
    { children, title, className }:
    { children: any, title: string, className?: string }
) {
    return (
        <div className={clsx(styles.tile, "border")}>
            <p className={styles.title}>{title}.tsx</p>
            <div className={clsx("content", className)}>
                {children}
            </div>
        </div>
    );
}
import styles from "@/components/Tile.module.css";

export function Tile({ title, id, children }: { title: string, id?: string, children: any }) {
    return (
        <div id={styles.tile}>
            <p id={styles.title}>{title}.tsx</p>
            <div id={id}>
                {children}
            </div>
        </div>
    );
}
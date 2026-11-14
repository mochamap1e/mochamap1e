import styles from "@/components/Tile.module.css";

export function Tile({ title, id, className, children }: { title: string, id?: string, className?: string, children: any }) {
    return (
        <div id={styles.tile} className={className}>
            <p id={styles.title}>{title}.tsx</p>
            <div id={id}>
                {children}
            </div>
        </div>
    );
}
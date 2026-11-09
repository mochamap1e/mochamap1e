import styles from "@/components/Social.module.css";

export function Social({ text, handle, img, url }: { text: string, handle: string, img: string, url: string }) {
    return (
        <div id={styles.social} onClick={() => window.open(url, "_blank")}>
            <img src={`/socials/${img}`}/>
            <div>
                <h1>{text}</h1>
                <p>@{handle}</p>
            </div>
        </div>
    );
}
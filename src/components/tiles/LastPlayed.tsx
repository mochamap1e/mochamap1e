import axios from "axios";
import { useState, useEffect } from "react";

import { Tile } from "../Tile";

import styles from "./LastPlayed.module.css";

function Link({ children, href }: { children: any, href: string }) {
    return (<a
        className={styles.link}
        href={href}
        target="_blank"
    >{children}</a>);
}

export function LastPlayed() {
    const [data, setData] = useState<FmTrack | null>(null);
    const [image, setImage] = useState("");

    function getRelativeTime(uts: number) {
        const timestamp = uts * 1000;

        const now = Date.now();
        const difference = now - timestamp;

        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return rtf.format(-seconds, "second");
        } else if (minutes < 60) {
            return rtf.format(-minutes, "minute");
        } else if (hours < 24) {
            return rtf.format(-hours, "hour");
        } else {
            return rtf.format(-days, "day");
        }
    }

    useEffect(() => {
        async function getLastPlayed() {
            try {
                const response = await axios.get("http://127.0.0.1:8787/api/fm");
                const data: FmTrack = response.data;

                const image = data.image.find(image => image.size === "large");
                if (image) setImage(image["#text"]);

                setData(data);
                /*
                setName(data.name);
                setNameLink(data.url);

                setArtist(data.artist["#text"]);
                setAlbum(data.album["#text"]);
                setTime();
                */
            } catch(error) {
                return console.error(error);
            }
        }

        getLastPlayed();
    }, []);

    if (data) {
        return (
            <Tile title="LastPlayed" className={styles.tile}>
                {data && (
                    <div className="content">
                        <img src={image} className={styles.cover}/>

                        <p>
                            <Link href={data.url}>{data.name}</Link>
                            {" - "}
                            <Link href={`https://last.fm/music/${data.artist["#text"]}`}>{data.artist["#text"]}</Link>
                        </p>

                        <p>{getRelativeTime(parseInt(data.date.uts))}</p>
                    </div>
                )}
            </Tile>
        );
    }
}
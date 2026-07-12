import axios from "axios";
import { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export function LastPlayed() {
    const [name, setName] = useState("...");
    const [artist, setArtist] = useState("...");
    const [album, setAlbum] = useState("...");
    const [time, setTime] = useState("...");
    const [image, setImage] = useState("...");

    const [cache, setCache] = useLocalStorage<FmCache | undefined>("fmcache", undefined);

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
        let data: FmTrack | undefined = undefined;

        async function fetch() {
            try {
                const response = await axios.get("http://127.0.0.1:8787/api/fm");

                data = response.data;

                if (data) setCache({ data, date: Date.now() });
            } catch(error) {
                return console.error(error);
            }
        }

        if (cache) {
            if ((Date.now() - cache.date) > 1) {
                fetch();
            } else {
                data = cache;
            }
        } else {
            fetch();
        }

        const image = data.image.find(image => image.size === "large");
        if (image) setImage(image["#text"]);

        setName(data.name);
        setArtist(data.artist["#text"]);
        setAlbum(data.album["#text"]);
        setTime(getRelativeTime(parseInt(data.date.uts)));
    }, []);

    return (
        <div>
            <p>Name: {name}</p>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            <p>Time: {time}</p>
            <img src={image}/>
        </div>
    );
}
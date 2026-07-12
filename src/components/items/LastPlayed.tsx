import axios from "axios";
import { useState, useEffect } from "react";

export function LastPlayed() {
    const [name, setName] = useState("...");
    const [artist, setArtist] = useState("...");
    const [album, setAlbum] = useState("...");
    const [image, setImage] = useState("...");

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get("http://127.0.0.1:8787/api/fm");
                const data: FmTrack = response.data;

                const image = data.image.find(image => image.size === "large");
                if (image) setImage(image["#text"]);

                setName(data.name);
                setArtist(data.artist["#text"]);
                setAlbum(data.album["#text"]);
            } catch(error) {
                return console.error(error);
            }
        }

        fetch();
    }, []);

    return (
        <div>
            <p>Name: {name}</p>
            <p>Artist: {artist}</p>
            <p>Album: {album}</p>
            <img src={image}/>
        </div>
    );
}
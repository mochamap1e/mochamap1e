import { useState, useEffect } from "react";

import { Tile } from "../Tile";

export function Status() {
    const [status, setStatus] = useState<any>(undefined);
    
    const [online, setOnline] = useState(false);
    const [statusQuote, setStatusQuote] = useState("...");

    const [song, setSong] = useState<SongData | undefined>();

    // socket main
    useEffect(() => {
        const userId = "1369412711024169140";
        const socket = new WebSocket("wss://api.lanyard.rest/socket");

        let heartbeats: number | undefined = undefined;

        function message(data: {}) { socket.send(JSON.stringify(data)); };
        function heartbeat() { message({ op: 3 }) };

        socket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.op === 0) { //// presence update
                    data.t === "INIT_STATE" ? setStatus(data.d[userId]) : setStatus(data.d);
                } else if (data.op === 1) { //// initialization
                    // subscribe
                    message({ op: 2, d: { subscribe_to_ids: [userId] } });

                    // heartbeat
                    heartbeat();
                    heartbeats = setInterval(heartbeat, data.d.heartbeat_interval);
                }
            } catch(error) {
                console.error("Failed to parse websocket message.");
            }
        });

        if (import.meta.env.DEV) {
            socket.addEventListener("open", () => console.log("Lanyard socket open."));
            socket.addEventListener("close", () => console.log("Lanyard socket closed."));
        }

        return () => {
            clearInterval(heartbeats);
            socket.close();
        }
    }, []);

    // update handler
    useEffect(() => {
        if (!status) return; console.log("status:", status);

        const activities = status.activities;

        //////////// online ////////////

        ["online", "idle", "dnd"].includes(status.discord_status) ? setOnline(true) : setOnline(false);

        //////////// quote ////////////

        //@ts-ignore
        const customActivity = activities.find(activity => activity.id === "custom");
        if (customActivity) setStatusQuote(customActivity.state);

        //////////// music ////////////

        let songActivity: any;

        //@ts-ignore
        activities.forEach(activity => {
            if (activity.details_url && activity.details_url.includes("song")) {
                songActivity = activity
            } 
        });

        if (songActivity) {
            // handle weird ass apple music image link
            let image = songActivity.assets.large_image;
            image = image.substring(image.indexOf("https")).replace("https", "https:/");

            setSong({
                image,
                title: songActivity.details,
                artist: songActivity.state,
                url: songActivity.details_url
            });
        } else {
            setSong(undefined);
        }

        //////////// game ////////////
    }, [status]);

    return (
        <Tile title="Status">
            <h1>Hi</h1>
            <p>Online: {online ? "true" : "false"}</p>
            <p>Status: {statusQuote}</p>

            {song && (
                <div>
                    <img className="border" src={song.image}/>
                    <p>Song title: {song.title}</p>
                    <p>Song artist: {song.artist}</p>
                    <a href={song.url} target="_blank"><p>{song.url}</p></a>
                </div>
            )}
        </Tile>
    )
}

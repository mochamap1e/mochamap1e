import clsx from "clsx";
import { useState, useEffect } from "react";

import { Tile } from "../Tile";

import styles from "./Status.module.css";

export function Status() {
    const [status, setStatus] = useState<any>(undefined);

    const [pfp, setPfp] = useState<string | undefined>(undefined);
    const [nickname, setNickname] = useState("...");
    const [username, setUsername] = useState("...");
    
    const [online, setOnline] = useState(false);
    const [statusQuote, setStatusQuote] = useState<string | undefined>("...");

    const [song, setSong] = useState<SongData | undefined>();
    const [game, setGame] = useState<GameData | undefined>();

    const userId = "1369412711024169140";

    function appAsset(appId: string, assetId: string) { return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png` }

    // socket main
    useEffect(() => {
        const socket = new WebSocket("wss://api.lanyard.rest/socket");

        let heartbeats: number | undefined = undefined;

        function message(data: {}) { socket.send(JSON.stringify(data)); }
        function heartbeat() { message({ op: 3 }); }

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

        socket.addEventListener("close", () => clearInterval(heartbeats));

        return () => {
            clearInterval(heartbeats);
            socket.close();
        }
    }, []);

    // data handler
    useEffect(() => {
        if (!status) return; console.log("status:", status);

        //////////// info ////////////

        setPfp(`https://cdn.discordapp.com/avatars/${userId}/${status.discord_user.avatar}.jpg?size=256`);
        setNickname(status.discord_user.global_name);
        setUsername(status.discord_user.username);
        ["online", "idle", "dnd"].includes(status.discord_status) ? setOnline(true) : setOnline(false);

        //////////// activity shit ////////////

        let activities = status.activities;

        function remove(element: any) { activities.splice(activities.indexOf(element), 1); }

        //// 1. status

        //@ts-ignore
        const customActivity = activities.find(activity => activity.id === "custom");

        if (customActivity) {
            setStatusQuote(customActivity.state);
            remove(customActivity);
        } else {
            setStatusQuote(undefined);
        }

        //// 2. music

        let songActivity: any;

        //@ts-ignore
        activities.forEach(activity => {
            if (activity.details_url && activity.details_url.includes("song")) {
                songActivity = activity;
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

            remove(songActivity);
        } else {
            setSong(undefined);
        }

        //// 3. game

        const gameActivity = activities[0];

        if (gameActivity) {
            const gameData: GameData = {
                appId: gameActivity.application_id,
                name: gameActivity.name
            };

            if (gameActivity.details) gameData.details = gameActivity.details;
            if (gameActivity.state) gameData.state = gameActivity.state;

            const assets = gameActivity.assets;

            if (assets) {
                if (assets.large_image) gameData.largeImage = assets.large_image;
                if (assets.large_text) gameData.largeImageText = assets.large_text;
                if (assets.small_image) gameData.smallImage = assets.small_image;
                if (assets.small_text) gameData.smallImageText = assets.small_text;
            }

            setGame(gameData);
        } else {
            setGame(undefined);
        }
    }, [status]);

    return (
        <Tile title="Status">
            <div className={styles.pfp}>
                {pfp && (<img className={clsx(styles.pfpImg, "border")} src={pfp}/>)}
                <div 
                    className={clsx(styles.indicator, "border")}
                    style={{
                        backgroundColor: online ? "#9dce69" : "#6f789f"
                    }}
                />
            </div>

            <div>
                <h1>{nickname}</h1>
                <p>@{username}</p>
                {status && (<p>"{statusQuote}"</p>)}
            </div>

            {game && (
                <div>
                    <h1>Playing:</h1>
                    {game.largeImage && (<img src={appAsset(game.appId, game.largeImage)}/>)}

                    <p>{game.name}</p>

                    {game.details && (<p>{game.details}</p>)}
                    {game.state && (<p>{game.state}</p>)}
                </div>
            )}

            {song && (
                <div>
                    <h1>Listening to:</h1>
                    <img className="border" src={song.image}/>
                    <a href={song.url} target="_blank">
                        <p>{song.title} - {song.artist}</p>
                    </a>
                </div>
            )}
        </Tile>
    )
}

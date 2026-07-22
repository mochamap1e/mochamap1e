import clsx from "clsx";
import { useState, useEffect } from "react";

import { Tile } from "../Tile";

import styles from "./Status.module.css";

export function Status() {
    const [status, setStatus] = useState<Status | undefined>(undefined);

    const userId = "1369412711024169140";

    function appAsset(appId: string, assetId: string) { return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`; }
    function songAsset(uri: string) { return uri.substring(uri.indexOf("https")).replace("https", "https:/"); }

    function Presence({ text, largeImage, largeImageText, smallImage, smallImageText, children } : {
        text: string,
        largeImage: string | undefined,
        largeImageText: string | undefined,
        smallImage: string | undefined,
        smallImageText: string | undefined,
        children?: any
    }) {
        function Image({ style, src, text }: { style: string, src: string, text?: string }) {
            return (<img
                className={clsx(style, "border")}
                src={src}
                title={text ? text : undefined}
            />);
        }

        return (
            <div>
                <h2>{text}</h2>
                <div>
                    {largeImage && (<Image style={styles.largeImg} src={largeImage} text={largeImageText}/>)}
                    {smallImage && (<Image style={styles.smallImg} src={smallImage} text={smallImageText}/>)}
                </div>
                {children && (
                    <div>
                        {children}
                    </div>
                )}
            </div>
        );
    }

    // socket main
    useEffect(() => {
        //// WEBSOCKET SETUP

        const socket = new WebSocket("wss://api.lanyard.rest/socket");

        let heartbeats: number | undefined = undefined;

        function message(data: {}) { socket.send(JSON.stringify(data)); }
        function heartbeat() { message({ op: 3 }); }

        socket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.op === 0) { //// presence update
                    parseStatus(data.d);
                } else if (data.op === 1) { //// initialization
                    // subscribe
                    message({ op: 2, d: { subscribe_to_id: userId } });

                    // heartbeat
                    heartbeat();
                    heartbeats = setInterval(heartbeat, data.d.heartbeat_interval);
                }
            } catch(error) {
                console.error("Failed to parse websocket message.");
            }
        });

        socket.addEventListener("close", () => clearInterval(heartbeats));

        //// DATA PARSER

        function parseStatus(data: any) {
            let parsed: Status = {
                pfp: `https://cdn.discordapp.com/avatars/${userId}/${data.discord_user.avatar}.jpg?size=256`,
                nickname: data.discord_user.global_name,
                username: data.discord_user.username,
                online: ["online", "idle", "dnd"].includes(data.discord_status)
            }

            //// activities

            let activities = data.activities;

            function remove(element: any) { activities.splice(activities.indexOf(element), 1); }

            // 1. status

            //@ts-ignore
            const customActivity = activities.find(activity => activity.id === "custom");

            if (customActivity) {
                parsed.quote = customActivity.state;
                remove(customActivity);
            }

            // 2. music

            let songActivity: any;

            //@ts-ignore
            activities.forEach(activity => {
                if (activity.details_url && activity.details_url.includes("song")) {
                    songActivity = activity;
                } 
            });

            if (songActivity) {
                parsed.song = {
                    largeImage: songAsset(songActivity.assets.large_image),
                    largeImageText: songActivity.assets.large_text,
                    smallImage: songAsset(songActivity.assets.small_image),
                    smallImageText: songActivity.assets.small_text,
                    title: songActivity.details,
                    artist: songActivity.state,
                    album: songActivity.assets.large_text,
                    url: songActivity.details_url,
                    timeStart: songActivity.timestamps.start,
                    timeEnd: songActivity.timestamps.end
                };

                remove(songActivity);
            }

            // 3. game

            const gameActivity = activities[0];

            if (gameActivity) {
                const game: Game = {
                    appId: gameActivity.application_id,
                    timestamp: gameActivity.timestamps.start,
                    name: gameActivity.name
                };

                if (gameActivity.details) game.details = gameActivity.details;
                if (gameActivity.state) game.state = gameActivity.state;

                const assets = gameActivity.assets;

                if (assets) {
                    if (assets.large_image) game.largeImage = assets.large_image;
                    if (assets.large_text) game.largeImageText = assets.large_text;
                    if (assets.small_image) game.smallImage = assets.small_image;
                    if (assets.small_text) game.smallImageText = assets.small_text;
                }

                parsed.game = game;
            }

            setStatus(parsed);
        }

        //// CLEANUP

        return () => {
            clearInterval(heartbeats);
            socket.close();
        }
    }, []);

    // game time
    useEffect(() => {
        function updateTimeElapsed(){
            if (!status || !status.game) { return; };

            const currentTime = Date.now();
            const elapsedMilliseconds = currentTime - status.game.timestamp;
            const totalSeconds = Math.floor(elapsedMilliseconds / 1000);

            const hours = String(Math.floor(totalSeconds / 3600)).padStart(1, "0");
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(1, "0");
            const seconds = String(totalSeconds % 60).padStart(2, "0");

            let gameTimeElapsed: string;

            if (hours === "0") {
                gameTimeElapsed = `${minutes}:${seconds}`;
            } else {
                gameTimeElapsed = `${hours}:${minutes}:${seconds}`;
            }

            setStatus(status => status ? { ...status, gameTimeElapsed } : status);
        }

        updateTimeElapsed();
        const interval = setInterval(updateTimeElapsed, 1000);

        return () => clearInterval(interval);
    }, [status]);

    return status ? (
        <Tile title="Status">
            <div className={styles.pfp}>
                <img className={clsx(styles.pfpImg, "border")} src={status.pfp}/>
                <div 
                    className={clsx(styles.indicator, "border")}
                    style={{
                        backgroundColor: status.online ? "#9dce69" : "#6f789f"
                    }}
                />
            </div>

            <div>
                <h1>{status.nickname}</h1>
                <p>@{status.username}</p>
                {status && (<p>"{status.quote}"</p>)}
            </div>

            {status.game && (
                <Presence
                    text="Playing"
                    largeImage={status.game.largeImage && appAsset(status.game.appId, status.game.largeImage)}
                    largeImageText={status.game.largeImageText && (status.game.largeImageText)}
                    smallImage={status.game.smallImage && appAsset(status.game.appId, status.game.smallImage)}
                    smallImageText={status.game.smallImageText && (status.game.smallImageText)}
                >
                    <p>{status.game.name}</p>
                    {status.game.details && (<p>{status.game.details}</p>)}
                    {status.game.state && (<p>{status.game.state}</p>)}
                    {status.gameTimeElapsed && (<p>{status.gameTimeElapsed}</p>)}
                </Presence>
            )}

            {status.song && (
                <Presence
                    text="Listening to"
                    largeImage={status.song.largeImage}
                    largeImageText={status.song.largeImageText && (status.song.largeImageText)}
                    smallImage={status.song.smallImage}
                    smallImageText={status.song.smallImageText && (status.song.smallImageText)}
                >
                    <p>{status.song.title}</p>
                    <p>{status.song.artist}</p>
                    <p>{status.song.album}</p>
                </Presence>
            )}
        </Tile>
    ) : null;
}

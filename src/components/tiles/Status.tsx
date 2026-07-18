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
    const [gameTimeElapsed, setGameTimeElapsed] = useState<string | undefined>();

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
        const socket = new WebSocket("wss://api.lanyard.rest/socket");

        let heartbeats: number | undefined = undefined;

        function message(data: {}) { socket.send(JSON.stringify(data)); }
        function heartbeat() { message({ op: 3 }); }

        socket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.op === 0) { //// presence update
                    setStatus(data.d);
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

        return () => {
            clearInterval(heartbeats);
            socket.close();
        }
    }, []);

    // data handler
    useEffect(() => {
        if (!status) return;

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
            setSong({
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
                timestamp: gameActivity.timestamps.start,
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

    // game time
    useEffect(() => {
        function updateTimeElapsed(){
            if (!game) {
                setGameTimeElapsed(undefined);
                return;
            };

            const currentTime = Date.now();
            const elapsedMilliseconds = currentTime - game.timestamp;
            const totalSeconds = Math.floor(elapsedMilliseconds / 1000);

            const hours = String(Math.floor(totalSeconds / 3600)).padStart(1, "0");
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(1, "0");
            const seconds = String(totalSeconds % 60).padStart(2, "0");

            if (hours === "0") {
                setGameTimeElapsed(`${minutes}:${seconds}`);
            } else {
                setGameTimeElapsed(`${hours}:${minutes}:${seconds}`);
            }
        }

        updateTimeElapsed();
        const interval = setInterval(updateTimeElapsed, 1000);

        return () => clearInterval(interval);
    }, [game]);

    return (
        <Tile title="Status">
            {pfp && (
                <div className={styles.pfp}>
                    <img className={clsx(styles.pfpImg, "border")} src={pfp}/>
                    <div 
                        className={clsx(styles.indicator, "border")}
                        style={{
                            backgroundColor: online ? "#9dce69" : "#6f789f"
                        }}
                    />
                </div>
            )}

            <div>
                <h1>{nickname}</h1>
                <p>@{username}</p>
                {status && (<p>"{statusQuote}"</p>)}
            </div>

            {game && (
                <Presence
                    text="Playing"
                    largeImage={game.largeImage && appAsset(game.appId, game.largeImage)}
                    largeImageText={game.largeImageText && (game.largeImageText)}
                    smallImage={game.smallImage && appAsset(game.appId, game.smallImage)}
                    smallImageText={game.smallImageText && (game.smallImageText)}
                >
                    <p>{game.name}</p>
                    {game.details && (<p>{game.details}</p>)}
                    {game.state && (<p>{game.state}</p>)}
                    {gameTimeElapsed && (<p>{gameTimeElapsed}</p>)}
                </Presence>
            )}

            {song && (
                <Presence
                    text="Listening to"
                    largeImage={song.largeImage}
                    largeImageText={song.largeImageText && (song.largeImageText)}
                    smallImage={song.smallImage}
                    smallImageText={song.smallImageText && (song.smallImageText)}
                >
                    <p>{song.title}</p>
                    <p>{song.artist}</p>
                    <p>{song.album}</p>
                </Presence>
            )}
        </Tile>
    )
}

import axios from "axios";
import { useState, useEffect } from "react";
import { Shader, FlowingGradient, Aurora, FloatingParticles } from "shaders/react";
import { useLocalStorage } from "usehooks-ts";
import { useLanyard } from "use-lanyard";

import { Tile } from "@/components/Tile";
import { Social } from "@/components/Social";
import { Badge } from "@/components/Badge";

import { seed, isChristmas, getOrdinalSuffix } from "@/utils";

import "@/styles.css";

export function App() {
    const api = "https://api.mochamaple.cafe";
    const discordId = "1369412711024169140";
    const avatarFallback = "https://github.com/mochamap1e.png?size=256";

    const [visits, setVisits] = useState("...");
    const [time, setTime] = useState("0:00");
    const [backgroundSeed] = useState(() => seed());

    const [use12h, setUse12h] = useLocalStorage("12h", new Intl.DateTimeFormat(undefined, { hour: "numeric" }).resolvedOptions().hour12);

    const presence = useLanyard(discordId);

    useEffect(() => {
        (async () => {
            try {
                await axios.post(`${api}/visit`);
            } catch(e) {}

            try {
                const response = await axios.get(`${api}/visits`);
                setVisits(getOrdinalSuffix(response.data));
            } catch(error) {
                console.error(":c failed to fetch visits", error);
            }
        })();
    }, []);

    useEffect(() => {
        function updateTime() {
            setTime(new Intl.DateTimeFormat("en-US", {
                timeZone: "America/New_York",
                hour: "2-digit",
                minute: "2-digit",
                hour12: use12h
            }).format(new Date()));
        }

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [use12h]);

    return (
        <div>
            <div id="container">
                <Tile title="Me" id="me">
                    <div id="avatar-container">
                        <img
                            id="avatar"
                            src={
                                presence ?
                                    `https://cdn.discordapp.com/avatars/${discordId}/${presence.discord_user.avatar}.png?size=256`
                                    : avatarFallback
                                }
                            onError={(e) => e.currentTarget.src = avatarFallback}
                        />
                        {presence?.discord_user.avatar_decoration_data && (
                            <img
                                id="avatar-deco"
                                src={`https://cdn.discordapp.com/media/v1/collectibles-shop/${presence.discord_user.avatar_decoration_data.sku_id}/animated`}
                                onError={(e) => e.currentTarget.style.display = "none"}
                            />
                        )}
                    </div>

                    <div id="about">
                        <h1>lexi</h1>
                        <p>haii i'm lexi. i am a 16yo that loves geometry dash and minecraft and typescript. i also go by alex</p>

                        <div id="widgets">
                            <div>
                                <img src="/pin.svg"/>
                                <p>MA, US</p>
                            </div>
                            <div
                                id="time"
                                title="my current time"
                                onClick={() => setUse12h(!use12h)}
                            >
                                <img src="/clock.svg"/>
                                <p>{time}</p>
                            </div>
                        </div>
                    </div>
                </Tile>

                <Tile title="Socials" id="socials">
                    <Social
                        text="GitHub"
                        handle="mochamap1e"
                        img="github.svg"
                        url="https://github.com/mochamap1e"
                    />
                    <Social
                        text="Discord"
                        handle="mochamap1e"
                        img="discord.svg"
                        url="https://discord.com/users/1369412711024169140"
                    />
                    <Social
                        text="Twitter"
                        handle="mochamap1e"
                        img="twitter.svg"
                        url="https://twitter.com/mochamap1e"
                    />
                    <Social
                        text="YouTube"
                        handle="mocchamaple"
                        img="youtube.svg"
                        url="https://www.youtube.com/@mocchamaple"
                    />
                    <Social
                        text="Twitch"
                        handle="mocchamaple"
                        img="twitch.svg"
                        url="https://www.twitch.tv/mocchamaple"
                    />
                    <Social
                        text="TikTok"
                        handle="mochamap1e"
                        img="tiktok.svg"
                        url="https://www.tiktok.com/@mochamap1e"
                    />
                    <Social
                        text="Last.fm"
                        handle="mocchamaple"
                        img="lastfm.svg"
                        url="https://www.last.fm/user/mocchamaple"
                    />
                    <Social
                        text="Steam"
                        handle="mochamap1e"
                        img="steam.svg"
                        url="https://steamcommunity.com/id/mochamap1e"
                    />
                </Tile>

                <Tile title="Visitors" id="visitors">
                    <p>you are the <span>{visits}</span> visitor of this page! :3</p>
                </Tile>

                <Tile title="88x31" id="badges">
                    <Badge img="trans.png"/>
                    <Badge img="genderfluid.png"/>
                    <Badge img="finsexual.png"/>
                    <Badge img="femboy.png"/>
                    <iframe src="https://incr.easrng.net/badge?key=mochamap1e"/>
                    <Badge img="3ds.png"/>
                    <Badge img="css.png"/>
                    <Badge img="eyes.gif"/>
                    <Badge img="github.png"/>
                    <Badge img="twopaws.png"/>
                    <Badge img="vsc.png"/>
                    <Badge img="angelicide.png"/>
                </Tile>
            </div>

            <Shader id="bg">
                <FlowingGradient
                    colorA="#040029"
                    colorB="#00215e"
                    colorC="#36007c"
                    colorD="#00255c"
                    seed={backgroundSeed}
                />
                {isChristmas() && (
                    <Aurora
                        waviness={25}
                        height={40}
                        rayDensity={75}
                        intensity={50}
                        seed={backgroundSeed}
                    />
                )}
                {isChristmas() && (
                    <FloatingParticles
                        shape="glow"
                        angle={270}
                        speed={0.15}
                        particleSize={0.5}
                        speedVariance={0.7}
                    />
                )}
            </Shader>
        </div>
    );
}
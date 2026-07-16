import clsx from "clsx";

import { Tile } from "../Tile";

import styles from "./Socials.module.css";

function Social({ url, icon, text }: { url: string, icon: string, text: string }) {
    return (
        <div
            className={clsx(styles.social, "border")}
            onClick={() => window.open(url, "_blank")}
        >
            <img src={`/img/socials/${icon}`}/>
            <p>{text}</p>
        </div>
    );
}

export function Socials() {
    return (
        <Tile title="Socials" className={styles.socials}>
            <Social
                url="https://github.com/mochamap1e"
                icon="github.svg"
                text="GitHub"
            />
            <Social
                url="https://discord.com/users/1369412711024169140"
                icon="discord.svg"
                text="Discord"
            />
            <Social
                url="https://www.youtube.com/@mocchamaple"
                icon="youtube.svg"
                text="YouTube"
            />
            <Social
                url="https://www.twitch.tv/mocchamaple"
                icon="twitch.svg"
                text="Twitch"
            />
            <Social
                url="https://www.tiktok.com/@mochamap1e"
                icon="tiktok.svg"
                text="TikTok"
            />
            <Social
                url="https://www.last.fm/user/mocchamaple"
                icon="lastfm.svg"
                text="Last.fm"
            />
            <Social
                url="https://steamcommunity.com/id/mochamap1e"
                icon="steam.svg"
                text="Steam"
            />
            <Social
                url="https://gdbrowser.com/u/mochamaple"
                icon="gdlb.png"
                text="Geometry Dash"
            />
            <Social
                url="https://gdladder.com/profile/55942"
                icon="gddl.png"
                text="GD Demon Ladder"
            />
        </Tile>
    );
}
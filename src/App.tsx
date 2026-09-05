import { useState } from "react";
import { randomInt } from "mathjs";
import { Shader, FlowingGradient } from "shaders/react";

import { Social } from "./components/Social";

import "./styles.css";

/*
<div className="socials">
    <Social text="GitHub" icon="github" link="https://github.com/mochamap1e"/>
    <Social text="Discord" icon="discord" link="https://discord.com/users/1369412711024169140"/>
    <Social text="YouTube" icon="youtube" link="https://www.youtube.com/@mocchamaple"/>
    <Social text="Twitch" icon="twitch" link="https://www.twitch.tv/mocchamaple"/>
    <Social text="TikTok" icon="tiktok" link="https://www.tiktok.com/@mochamap1e"/>
    <Social text="Last.fm" icon="lastfm" link="https://www.last.fm/user/mocchamaple"/>
</div>
*/

export function App() {
    const [seed] = useState(() => randomInt(1000, 9999));

    return (
        <div>
            {/* content */}
            <div className="container">
                <div className="container">
                    <div>
                        <img 
                            className="pfp"
                            src="https://github.com/mochamap1e.png?size=128"
                            draggable={false}
                        />
                    </div>
                    <div>
                        <h1>lexi / alex</h1>
                        <p>@mochamap1e</p>
                    </div>
                </div>
                
                <div className="container">
                    <h1>Test</h1>
                </div>
            </div>

            {/* background */}
            <Shader className="background">
                <FlowingGradient
                    seed={seed}
                    speed={2}
                    colorC="#005d8f"
                    colorD="#00b4cc"
                />
            </Shader>
        </div>
    );
}
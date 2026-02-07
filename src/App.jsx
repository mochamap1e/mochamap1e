import { Octokit } from "octokit";
import { useState, useEffect } from "react";

import Ballpit from "./components/Ballpit";
import Social from "./components/Social";

import "./styles.css";

const octokit = new Octokit();

export default function App() {
    const [bio, setBio] = useState("fetching...");

    async function fetchBio() {
        try {
            const response = await octokit.request("GET /users/mochamap1e");
            setBio(response.data.bio);
        } catch(error) {
            setBio("failed to fetch bio");
        }
    }

    useEffect(() => { fetchBio() }, []);

    return (
        <>
            <div id="container">
                <img
                    id="pfp"
                    src="https://github.com/mochamap1e.png?size=256"
                    draggable={false}
                />

                <div id="items">
                    <div id="info">
                        <h1>mochamap1e</h1>
                        <p>{bio}</p>
                    </div>

                    <div id="socials">
                        <Social title="GitHub" image="github.svg" url="https://github.com/mochamap1e"/>
                        <Social title="Discord" image="discord.svg" url="https://discord.com/users/1369412711024169140"/>
                        <Social title="YouTube" image="youtube.svg" url="https://www.youtube.com/@mocchamaple"/>
                        <Social title="Twitch" image="twitch.svg" url="https://www.youtube.com/@mocchamaple"/>
                        <Social title="Steam" image="steam.svg" url="https://steamcommunity.com/id/mochamap1e"/>
                        <Social title="Geometry Dash" image="gd.png" url="https://gdbrowser.com/u/mochamaple"/>
                    </div>
                </div>
            </div>

            <Ballpit limit={40}/>
        </>
    )
}
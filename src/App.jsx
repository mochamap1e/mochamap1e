import { Octokit } from "octokit";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

import "./styles.css";
import MusicButton from "./components/MusicButton";

export default function App() {
    const [musicPlaying, setMusicPlaying] = useState(false);

    ////////// BIO //////////

    const octokit = new Octokit();

    const storageKey = "cachedBio";
    const [bioText, setBioText] = useState("fetching...");

    async function requestCurrentBio() {
        try {
            const { data: { bio: response } } = await octokit.request("GET /users/mochamap1e");

            setBioText(response);
            localStorage.setItem(storageKey, JSON.stringify({ text: response, timestamp: Date.now() }));
        } catch(error) {
            setBioText("failed to fetch bio");
            console.error(error);
        }
    }

    useEffect(() => {
        const storedBio = localStorage.getItem(storageKey);

        if (storedBio) {
            const parsedStoredBio = JSON.parse(storedBio);

            if ((Date.now() - parsedStoredBio.timestamp) >= 3600000) { // 1 hour
                requestCurrentBio();
            } else {
                setBioText(parsedStoredBio.text);
            }
        } else {
            requestCurrentBio();
        }
    }, []);

    ////////// PAGE //////////

    return (
        <div id="main-container">
            <div id="top-container">
                <div id="info-container" className="container">
                    <img
                        id="info-img"
                        className="img-border rounded-image"
                        src="https://github.com/mochamap1e.png?size=256"
                        draggable="false"
                    />

                    <div>
                        <h1>mochamap1e</h1>
                        <p>{bioText}</p>
                    </div>
                </div>

                <h2>hi</h2>
            </div>

            <div className="container">
                <motion.img
                    id="cover-img"
                    className="img-border rounded-image"
                    src="/cover.jpg"
                    draggable="false"
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <h2>bossa lullaby - nicopatty</h2>

                <MusicButton src="/icons/play.svg" />
            </div>
        </div>
    )
}
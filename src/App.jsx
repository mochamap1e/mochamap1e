import { Octokit } from "octokit";
import { useState, useEffect } from "react";

import "./styles.css";
import Link from "./components/Link";

export default function App() {
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
        <div id="page-container" className="container">
            <div id="info-container" className="container">
                <img
                    src="https://github.com/mochamap1e.png?size=256"
                    draggable="false"
                />

                <div>
                    <h1>mochamap1e</h1>
                    <p>{bioText}</p>
                </div>
            </div>

            <div id="links-container" className="container">
                <Link>projects</Link>
                <Link>socials</Link>
                <Link>setup</Link>
            </div>
        </div>
    )
}
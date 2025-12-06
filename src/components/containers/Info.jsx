import { useState, useEffect } from "react";
import { Octokit } from "octokit";

const octokit = new Octokit();

export default function Info() {
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

    return (
        <div className="flex items-center justify-center border-2 border-white p-8 gap-10">
            <img
                src="https://github.com/mochamap1e.png?size=256"
                className="rounded-full border-3 border-white w-30"
                draggable="false"
            />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl text-center">mochamap1e</h1>
                <p className="max-w-[30ch] wrap-break-word">{bioText}</p>
            </div>
        </div>
    )
}
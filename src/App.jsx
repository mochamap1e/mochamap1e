import clsx from "clsx";
import { Octokit } from "octokit";
import { useRef, useState, useEffect } from "react";

import Button from "./components/Button";
import Popup from "./components/Popup";
import container from "./styles/container";

import "./styles.css";

const octokit = new Octokit();

export default function App() {
    ////////// REFS & STATES //////////

    const projectsPopupRef = useRef(null);

    ////////// BIO HANDLING //////////

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
        <div className="bg-black flex max-sm:flex-col items-center justify-center w-screen h-screen gap-20">
            { /* ---- ABOUT ---- */ }

            <div className={clsx(container, "flex items-center justify-center gap-10 p-8")}>
                <img
                    src="https://github.com/mochamap1e.png?size=256"
                    className="rounded-full border-3 border-white w-30"
                    draggable="false"
                />
                <div className="flex flex-col gap-4">
                    <h1 className="text-center">mochamap1e</h1>
                    <p className="max-w-[30ch] wrap-break-word">{bioText}</p>
                </div>
            </div>
            
            { /* ---- LINKS ---- */ }

            <div className="flex flex-col max-sm:items-center gap-4">
                <Button text="projects" onClick={() => projectsPopupRef.current.show()} />
                <Button text="socials" onClick={() => projectsPopupRef.current.show()} />
                <Button text="setup" onClick={() => projectsPopupRef.current.show()} />
            </div>

            { /* ---- POPUPS ---- */ }

            <Popup ref={projectsPopupRef} elements={
                <>
                    <h1>projects</h1>
                    <p>idk not many</p>
                </>
            } />
        </div>
    )
}
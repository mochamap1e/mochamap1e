import { useState, useEffect } from "react";
import { Octokit } from "octokit";

export default function Info() {
    const [bio, setBio] = useState("fetching...");

    useEffect(() => {
        const octokit = new Octokit();

        (async () => {
            try {
                const { data: { bio: response } } = await octokit.request("GET /users/mochamap1e");
                setBio(response);
            } catch(error) {
                setBio("failed to fetch bio");
            }
        })();
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
                <p className="max-w-[30ch] wrap-break-word">{bio}</p>
            </div>
        </div>
    )
}
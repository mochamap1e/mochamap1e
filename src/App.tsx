import type { Types } from "use-lanyard";

import { useState, useEffect } from "react";

import { useLanyard } from "@/clients/lanyard";
import { Music } from "@/components/Music";

import "@/bones/registry";
import "@/styles.css";

export function App() {
    const presence = useLanyard();

    const [musicActivity, setMusicActivity] = useState<Types.Activity | undefined>(undefined);

    useEffect(() => {
        if (!presence) return;

        setMusicActivity(presence.activities.find(activity => activity.type === 2));

        console.log("LANYARD_DBG:", presence);
    }, [presence])

    return (
        <div>
            <img
                className="pfp"
                src="https://github.com/mochamap1e.png?size=256"
                draggable={false}
            />

            <Music activity={musicActivity}/>
        </div>
    );
}
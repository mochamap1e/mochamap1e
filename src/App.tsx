import { useState, useEffect } from "react";
import { useLanyard } from "use-lanyard";


export function App() {
    const presence = useLanyard("1369412711024169140");

    return (
        <div>
            {presence && (
                <img src={`/status/${presence.discord_status}.svg`}/>
            )}
        </div>
    );
}
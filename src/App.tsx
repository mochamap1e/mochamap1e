import { useState } from "react";
import { randomInt } from "mathjs";
import { Shader, FlowingGradient } from "shaders/react";

import { Activity } from "./components/Activity";

import "./styles.css";

export function App() {
    const [seed] = useState(() => randomInt(1000, 9999));

    return (
        <div>
            {/* page */}
            <Activity/>
            
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
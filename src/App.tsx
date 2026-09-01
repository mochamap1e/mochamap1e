import { useState } from "react";
import { randomInt } from "mathjs";
import { Shader, FlowingGradient } from "shaders/react";

import "./styles.css";

export function App() {
    const [seed] = useState(() => randomInt(1000, 9999));

    return (
        <div>
            <div className="container">
                <div className="container">
                    <img src="https://github.com/mochamap1e.png?size=128"/>
                    <div>
                        <h1>alex</h1>
                        <p>@mochamap1e</p>
                    </div>
                </div>
            </div>

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
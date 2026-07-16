import { Me } from "./components/tiles/Me";
import { Socials } from "./components/tiles/Socials";
import { LastPlayed } from "./components/tiles/LastPlayed";
import { Ballpit } from "./components/tiles/Ballpit";

import { Background } from "./components/Background";

import "./styles.css";

export function App() {
    return (
        <div className="container">
            <Me/>
            <Socials/>
            <LastPlayed/>
            <Ballpit count={10}/>

            <Background/>
        </div>
    );
}
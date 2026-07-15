import { Me } from "./components/tiles/Me";
import { LastPlayed } from "./components/tiles/LastPlayed";
import { Ballpit } from "./components/tiles/Ballpit";

import { Background } from "./components/Background";

import "./styles.css";

export function App() {
    return (
        <div className="container">
            <Me/>
            <LastPlayed/>
            <Ballpit count={10}/>

            <Background/>
        </div>
    );
}
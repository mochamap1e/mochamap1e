import { Me } from "./components/items/Me";
import { MusicPlayer } from "./components/items/MusicPlayer";
import { Ballpit } from "./components/items/Ballpit";

import { Background } from "./components/Background";

import "./styles.css";

export function App() {
    return (
        <div>
            <Me/>
            <MusicPlayer/>
            <Background/>
            <Ballpit limit={10}/>
        </div>
    );
}
import { Me } from "./components/tiles/Me";
import { Status } from "./components/tiles/Status";
import { Socials } from "./components/tiles/Socials";
import { Ballpit } from "./components/tiles/Ballpit";

import { Background } from "./components/Background";

import "./styles.css";

export function App() {
    return (
        <div className="container">
            {/*<Me/>*/}
            <Status/>
            <Socials/>
            <Ballpit count={10}/>

            <Background/>
        </div>
    );
}
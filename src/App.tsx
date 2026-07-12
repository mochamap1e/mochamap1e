import { LastPlayed } from "./components/items/LastPlayed";
import { Background } from "./components/Background";

import "./styles.css";

export function App() {
    return (
        <div>
            <h1>mochaa</h1>
            <LastPlayed/>
            <Background/>
        </div>
    );
}
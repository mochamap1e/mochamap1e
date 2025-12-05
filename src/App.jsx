import Info from "./components/containers/Info";
import Links from "./components/containers/Links";

import "./styles.css";

export default function App() {
    return (
        <div className="bg-black flex items-center justify-center w-screen h-screen gap-20">
            <div>
                <Info />
            </div>
            <Links />
        </div>
    )
}
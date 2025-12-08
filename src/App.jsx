import Info from "./components/containers/Info";
import Links from "./components/containers/Links";

import "./styles.css";

export default function App() {
    return (
        <div className="bg-black flex max-sm:flex-col items-center justify-center w-screen h-screen gap-20">
            <Info />
            <Links />
        </div>
    )
}
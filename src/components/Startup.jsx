import clsx from "clsx";
import { useEffect, useState, useRef } from "react";

import gsap from "../utils/gsap";

export default function Startup() {
    const videoRef = useRef(null);
    const overlayRef = useRef(null);

    const [buttonVisible, setButtonVisible] = useState(true);

    const sound = new Audio("/sfx/startup.mp3"); sound.preload = "auto";

    useEffect(() => {
        videoRef.current.addEventListener("ended", () => {
            gsap.to(overlayRef.current, { opacity: 1 });
        });
    }, []);

    return (
        <div className={clsx(
            "bg-[linear-gradient(#cccccc_0%,#dedfdf_50%,#cccccc_100%)]",
            "flex items-center justify-center")}>
            
            {buttonVisible && <button className="fixed text-white text-2xl cursor-pointer z-3" onClick={() => {
                setButtonVisible(false);

                videoRef.current.play();
                sound.play();

                gsap.to(overlayRef.current, { opacity: 0, delay: 0.2 });
            }}>click</button>}

            <video muted preload="auto" ref={videoRef} src="/videos/startup.mp4" className="w-screen h-screen z-1"></video>
            <div ref={overlayRef} className="fixed bg-black w-screen h-screen z-2"></div>
        </div>
    );
}
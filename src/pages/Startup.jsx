import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FadeOverlay, { showOverlay } from "../components/FadeOverlay";
import centerElements from "../styles/centerElements";
import applyGain from "../utils/gain";

export default function Startup() {
    const navigate = useNavigate();

    const videoRef = useRef(null);
    const gainApplied = useRef(false);

    const [videoStarted, setVideoStarted] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const onVideoEnded = () => {
            showOverlay();
            setTimeout(() => navigate("/dashboard"), 2000);
        }

        if (video) video.addEventListener("ended", onVideoEnded);
        return () => {
            if (video) video.removeEventListener("ended", onVideoEnded);
        }
    }, []);

    return (
        <div
            className={`
                ${centerElements}
                bg-[linear-gradient(#c3c3c3_0%,#dedede_50%,#cccccc_100%)]
            `}>

            {!videoStarted &&
                <button
                    onClick={() => {
                        applyGain(videoRef.current, 4);
                        videoRef.current.play();

                        gainApplied.current = true;
                        setVideoStarted(true);
                    }}
                    className="fixed text-4xl cursor-pointer z-15"
                >start</button>
            }

            <video
                ref={videoRef}
                src="/videos/startup.mp4"
                preload="auto"
                className={`
                    w-screen h-screen
                    ${videoStarted ? "visible" : "invisible"}
                `}
            />

            <FadeOverlay initialOpacity={0} />
        </div>
    )
}
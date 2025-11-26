import { useEffect, useState, useRef } from "react";

export default function Startup({ onComplete }) {
    const audioDisabledPreference = localStorage.getItem("startupAudioDisabled") === "true";

    const videoRef = useRef(null);

    const [optionsVisible, setOptionsVisible] = useState(true);
    const [audioDisabled, setAudioDisabled] = useState(audioDisabledPreference || false);

    const soundRef = useRef(new Audio("/sfx/startup.mp3"));
    soundRef.current.preload = "auto";

    function toggleMute(value) {
        setAudioDisabled(value);
        localStorage.setItem("startupAudioDisabled", value);
    }

    useEffect(() => {
        const video = videoRef.current;
        const sound = soundRef.current;

        let videoEnded = false;
        const onEnded = () => {
            videoEnded = true;
            
            onComplete();
        }
        if (video) video.addEventListener("ended", onEnded);

        const onVisibilityChange = () => {
            if (document.hidden) {
                video.pause();
                sound.pause();
            } else {
                if (!videoEnded) {
                    video.play();
                    if (!audioDisabled) sound.play();
                }
            }
        }
        document.addEventListener("visibilitychange", onVisibilityChange);
        
        return () => {
            if (video) video.removeEventListener("ended", onEnded);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        }
    }, [audioDisabled]);

    return (
        <div className="flex flex-col items-center justify-center gap-5 z-2">
            {optionsVisible &&
            <div>
                <button className="text-white text-2xl cursor-pointer" onClick={() => {
                    setOptionsVisible(false);
                    videoRef.current.play();
                    if (!audioDisabled) soundRef.current.play();
                }}>play</button>
                
                <label className="text-white">mute? <input type="checkbox" checked={audioDisabled} onChange={(e) => toggleMute(e.target.checked)} /></label>
            </div>
            }

            <video muted preload="auto" ref={videoRef} src="/videos/startup.mp4" className="w-screen h-screen z-0"></video>
        </div>
    );
}
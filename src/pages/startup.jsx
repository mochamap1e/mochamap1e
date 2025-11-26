import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

export default function Startup() {
    const videoRef = useRef(null);
    const overlayRef = useRef(null);

    const [videoStarted, setVideoStarted] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div
            className={`
                flex items-center justify-center
                bg-[linear-gradient(#cccccc_0%,#dedfdf_50%,#cccccc_100%)]
            `}>
            
            {!videoStarted &&
                <button
                    onClick={() => {
                        setVideoStarted(true);
                        videoRef.current.play();
                    }}
                    className="fixed cursor-pointer z-2"
                >start</button>
            }
        
            <video
                ref={videoRef}
                src="/videos/startup.mp4"
                preload="auto"
                className={`
                    w-screen h-screen z-0
                    ${videoStarted ? "visible" : "invisible"}
                `}
            />

            <motion.div
                ref={overlayRef}
                className="fixed bg-black w-screen h-screen z-1"
                initial={{ opacity: 0 }}
            />
        </div>
    )
}
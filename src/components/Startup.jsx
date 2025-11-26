import { useEffect, useRef } from "react"

export default function Startup() {
    const videoRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            videoRef.current.play();
        }, 1000);

        videoRef.current.addEventListener("ended", () => {
            console.log("Done");
        });
    }, [])

    return (
        <div className="bg-[#d0d1d0] flex items-center justify-center">
            <video ref={videoRef} src="/videos/startup.mp4" className="w-screen h-screen z-1"></video>
            <div ref={overlayRef} className="fixed bg-black w-screen h-screen z-2"></div>
        </div>
    )
}
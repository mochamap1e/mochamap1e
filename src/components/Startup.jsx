import { useRef } from "react"

export default function Startup() {
    const videoRef = useRef(null);

    return (
        <div className="flex items-center justify-center">
            <video ref={videoRef} src="/videos/startup.mp4" className="h-screen"></video>
        </div>
    )
}
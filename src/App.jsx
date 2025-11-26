import clsx from "clsx";
import { useState, useRef } from "react";

import gsap from "./utils/gsap";
import Startup from "./components/Startup";

export default function App() {
  const [startupComplete, setStartupComplete] = useState(false);

  const overlayRef = useRef(null);

  gsap.to(overlayRef.current, { opacity: 1 });

  return (
    <div className={clsx(
        "bg-[linear-gradient(#cccccc_0%,#dedfdf_50%,#cccccc_100%)]",
        "flex items-center justify-center")}>

      {startupComplete ? <h1>hi</h1> : <Startup onComplete={() => setStartupComplete(true)} /> }
      <div ref={overlayRef} className="fixed bg-black w-screen h-screen z-1"></div>
    </div>
  )
}
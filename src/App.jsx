import Matter from "matter-js";
import { useRef, useState, useEffect } from "react";

import "./styles.css";

export default function App() {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite
        
        const engine = Engine.create();
        const render = Render.create({ canvas: canvas, engine: engine });

        Composite.add(engine.world, [
            Bodies.rectangle(window.innerWidth / 2, 0, 80, 80),
        ]);
        
        Render.run(render);
        Runner.run(Runner.create(), engine);

        function resize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setCanvasSize({ width: width, height: height });
            Render.setSize(render, width, height);
        }
        
        resize();

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [])

    return (
        <canvas width={canvasSize.width} height={canvasSize.height} ref={canvasRef}/>
    )
}
import { useRef, useEffect } from "react";
import Matter from "matter-js";

import "./styles.css";

export default function App() {
    const canvasRef = useRef(null);

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
            Bodies.rectangle(400, 200, 80, 80),
            Bodies.rectangle(400, 610, 810, 60, { isStatic: true })
        ]);
        
        Render.run(render);
        Runner.run(Runner.create(), engine);
    }, [])

    return (
        <canvas ref={canvasRef}/>
    )
}
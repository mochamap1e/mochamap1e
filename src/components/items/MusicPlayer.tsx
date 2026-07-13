import { Howler, Howl } from "howler";
import { useRef, useState, useEffect } from "react";

import { useLoudness } from "../../stores";

import { Tile } from "../Tile";

import styles from "./MusicPlayer.module.css";

export function MusicPlayer() {
    const musicRef = useRef<Howl>(null);

    const [playing, setPlaying] = useState(false);

    const setLoudness = useLoudness(state => state.setLoudness);

    // AUDIO
    useEffect(() => {
        const music = new Howl({ src: "/audio/music.mp3" });

        musicRef.current = music;

        // loudness analyzer
        const analyzer = Howler.ctx.createAnalyser();
        analyzer.fftSize = 1024;
        analyzer.smoothingTimeConstant = 0.1;

        Howler.masterGain.connect(analyzer);

        const freqData = new Float32Array(analyzer.frequencyBinCount);

        let kickLevel = 0;

        function getLoudness() {
            analyzer.getFloatFrequencyData(freqData);

            let sum = 0;
            let count = 0;

            // 20Hz - 150Hz
            const nyquist = Howler.ctx.sampleRate / 2;
            const low = Math.floor(20 / nyquist * freqData.length);
            const high = Math.floor(150 / nyquist * freqData.length);

            for (let i = low; i < high; i++) {
                sum += Math.pow(10, freqData[i] / 20);
                count++;
            }

            const energy = sum / count;

            kickLevel = kickLevel * 0.7 + energy * 0.3;

            return kickLevel * 50;
        }

        const interval = setInterval(() => setLoudness(getLoudness()), 10);

        // cleanup
        return () => {
            clearInterval(interval);
            music.unload();
            
            setLoudness(0);
        }
    }, []);

    // TOGGLING
    useEffect(() => {
        const music = musicRef.current; if (!music) return;
        playing ? music.play() : music.pause();
    }, [playing]);

    return (
        <Tile>
            <img className={styles.cover} src="/img/cover.jpg"/>
            <div className={styles.info}>
                <h1>tragedy</h1>
                <p>lexycat</p>
                
                <button
                    onClick={() => setPlaying(playing => !playing)}
                >{playing ? "Pause" : "Play"}</button>
            </div>
        </Tile>
    );
}
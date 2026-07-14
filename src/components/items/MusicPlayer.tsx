import { Howler, Howl } from "howler";
import { useRef, useState, useEffect, type MouseEventHandler } from "react";

import { useLoudness } from "../../stores";

import { Tile } from "../Tile";

import styles from "./MusicPlayer.module.css";

function Control({ image, onClick }: { image: string, onClick: MouseEventHandler }) {
    return (
        <div
            className={styles.control}
            onClick={onClick}
        >
            <img src={"/img/icons/" + image}/>
        </div>
    )
}

export function MusicPlayer() {
    const musicRef = useRef<Howl>(null);

    const [playing, setPlaying] = useState(false);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const setLoudness = useLoudness(state => state.setLoudness);

    // AUDIO
    useEffect(() => {
        const music = new Howl({
            src: "/audio/music.mp3",
            loop: true,
            onload: () => setDuration(music.duration())
        });

        musicRef.current = music;

        // loudness analyzer (this part is entirely vibe coded sorry too complex for me)
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

        const tick = setInterval(() => {
            setLoudness(getLoudness());
            setCurrentTime(music.seek());
        }, 10);

        // cleanup
        return () => {
            clearInterval(tick);
            music.unload();
            setLoudness(0);
        }
    }, []);

    // TOGGLING
    useEffect(() => {
        const music = musicRef.current; if (!music) return;
        playing ? music.play() : music.pause();
    }, [playing]);

    function seek(backwards: boolean) {
        const music = musicRef.current; if (!music) return;

        const change = 10;
        const newTime = music.seek() + (backwards ? -change : change);

        if ((newTime < 0) || (newTime >= duration)) {
            music.seek(0);
        } else {
            music.seek(newTime);
        }
    }

    return (
        <Tile>
            <img className={styles.cover} src="/img/cover.jpg"/>
            <div>
                <div className={styles.info}>
                    <h1>tragedy</h1>
                    <p>lexycat</p>
                </div>
                <div className={styles.progress}>
                    <div
                        className={styles.progressFill}
                        style={{ width: ((currentTime / duration) * 100) + "%" }}
                    />
                </div>
                <div className={styles.controls}>
                    <Control
                        onClick={() => seek(true)}
                        image="backward.svg"
                    />
                    <Control
                        onClick={() => setPlaying(playing => !playing)}
                        image={playing ? "pause.svg" : "play.svg"}
                    />
                    <Control
                        onClick={() => seek(false)}
                        image="forward.svg"
                    />
                </div>
            </div>
        </Tile>
    );
}
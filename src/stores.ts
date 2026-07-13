import { create } from "zustand";

interface LoudnessState {
    loudness: number,
    setLoudness: (loudness: number) => void
}

export const useLoudness = create<LoudnessState>((set) => ({
    loudness: 0,
    setLoudness: (loudness) => set({ loudness })
}));
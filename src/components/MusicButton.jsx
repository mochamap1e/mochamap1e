import { useState } from "react";
import { motion } from "motion/react";

import "./MusicButton.css";

export default function MusicButton({ src, onClick }) {
    const [image, setImage] = useState(src);

    return (
        <motion.button
            className="music-button"
            whileHover={{ scale: 1.2, cursor: "pointer" }}
            whileTap={{ scale: 1 }}
            onClick={onClick}
        >
            <img src={image} className="music-button-img" />
        </motion.button>
    )
}
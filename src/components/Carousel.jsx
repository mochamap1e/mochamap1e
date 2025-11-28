import { useEffect } from "react";
import { motion } from "motion/react";

import Page from "./Page"

export default function Carousel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
        
        <Page name="test" rows="3" columns="5" />

        </motion.div>
    )
}
import { motion } from "motion/react";

export default function Link({ text }) {
    return (
        <motion.p
            className="text-xl cursor-pointer hover:underline"
            whileHover={{ scale: 1.05 }}
        >{text}</motion.p>
    )
}
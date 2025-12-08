import clsx from "clsx";
import { motion } from "motion/react";

export default function Button({ text, onClick, extraClasses }) {
    return (
        <motion.p
            className={clsx("text-xl cursor-pointer hover:underline", extraClasses)}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >{text}</motion.p>
    )
}
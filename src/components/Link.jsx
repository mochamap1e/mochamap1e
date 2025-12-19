import { motion } from "motion/react"

export default function Link({ children }) {
    return (
        <motion.a
            whileHover={{ scale: 1.1, cursor: "pointer" }}
            whileTap={{ scale: 1 }}
        >
            <h2>{children}</h2>
        </motion.a>
    )
}
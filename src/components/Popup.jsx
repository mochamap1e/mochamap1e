import clsx from "clsx";
import { motion } from "motion/react";
import { useState, useImperativeHandle, forwardRef } from "react";

import Button from "./Button";
import container from "../styles/container";

export default forwardRef(({ elements }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => setIsVisible(true)
    }));

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed flex items-center justify-center w-screen h-screen z-1"
        >
            <motion.div className={clsx(container, "bg-black fixed flex flex-col p-12 gap-8")}>
                <Button
                    text="x"
                    onClick={() => setIsVisible(false)}
                    extraClasses="absolute top-2 right-4"
                />

                { elements }
            </motion.div>
        </motion.div>
    )
});
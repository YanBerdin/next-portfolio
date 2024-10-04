{/*
"use client";

import { motion } from "framer-motion";

export default function Title() {
    const letters = Array.from(" Grab the best ice cream.🍧");

    const container = {
        hidden: { opacity: 0 },
        visible: () => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 1 },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <aside className="w-1/2 flex flex-col items-start gap-8 font-recoleta">
            <motion.h2
                variants={container}
                initial="hidden"
                animate="visible"
                className="text-2xl leading-[0.85] text-white w-full"
            >
                {letters.map((letter, i) => (
                    <motion.span variants={child} key={i}>
                        {letter}
                    </motion.span>
                ))}
            </motion.h2>
            {/*
            <motion.p
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-xl text-slate-200 w-full font-sans font-medium"
            >
                We ditched the dairy we cut the sugar infused <br /> mood-boosting
                adaptogens
            </motion.p>
            */}

            {/*
            <motion.button
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                transition={{
                    duration: 2,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: 2.2,
                }}
                className="ovale"
            >
                Shop Flavors
            </motion.button>
            */}
            
            {/*
        </aside>
    );
}
*/}
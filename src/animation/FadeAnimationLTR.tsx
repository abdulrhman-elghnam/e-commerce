"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

export default function FadeAnimationLTR({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "tween", duration: 0.45 }}
        >
            {children}
        </motion.div>
    )
}

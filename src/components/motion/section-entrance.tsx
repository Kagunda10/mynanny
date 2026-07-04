'use client'

import { motion, useReducedMotion } from 'motion/react'
import { type ReactNode } from 'react'

interface SectionEntranceProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function SectionEntrance({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionEntranceProps) {
  const reduce = useReducedMotion()

  const offsets = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  }

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

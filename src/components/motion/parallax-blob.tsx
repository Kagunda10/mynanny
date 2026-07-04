'use client'

import { motion, useReducedMotion } from 'motion/react'
import { type ReactNode } from 'react'

interface ParallaxBlobProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
}

export function ParallaxBlob({
  children,
  className = '',
  duration = 4,
  distance = 10,
}: ParallaxBlobProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [-distance / 2, distance / 2, -distance / 2] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

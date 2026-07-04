'use client'

import { motion } from 'motion/react'
import { type ReactNode } from 'react'

interface DoubleBevelCardProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  hover?: boolean
}

export function DoubleBevelCard({
  children,
  className = '',
  innerClassName = '',
  hover = true,
}: DoubleBevelCardProps) {
  if (!hover) {
    return (
      <div className={`double-bezel ${className}`}>
        <div className={`double-bezel-inner ${innerClassName}`}>{children}</div>
      </div>
    )
  }

  return (
    <motion.div
      className={`double-bezel ${className}`}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(28, 20, 38, 0.12)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`double-bezel-inner ${innerClassName}`}>{children}</div>
    </motion.div>
  )
}

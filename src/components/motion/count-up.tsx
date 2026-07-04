'use client'

import { useInView, useMotionValue, useTransform, motion, animate } from 'motion/react'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountUp({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => `${prefix}${Math.floor(v).toLocaleString()}${suffix}`)

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration, ease: [0.16, 1, 0.3, 1] })
    }
  }, [isInView, target, duration, count])

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>
}

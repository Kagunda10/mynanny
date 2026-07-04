'use client'

import { useInView } from 'motion/react'
import { useRef } from 'react'

export function useEntrance(amount = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount })
  return { ref, isInView }
}

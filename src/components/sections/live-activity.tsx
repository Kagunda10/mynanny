'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DEFAULT_HOMEPAGE } from '@/lib/defaults'

type LiveActivityProps = {
  messages?: string[]
}

export function LiveActivity({ messages = DEFAULT_HOMEPAGE.activityMessages }: LiveActivityProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!messages.length) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [messages])

  if (!messages.length) return null

  return (
    <section className="py-12 flex justify-center px-5">
      <div className="double-bezel max-w-[720px] w-full">
        <div className="double-bezel-inner flex items-center justify-between py-4 px-6 overflow-hidden">
          <div className="flex items-center gap-4 min-w-0" aria-live="polite" aria-atomic="true">
            <span className="relative flex h-2 w-2 rounded-full bg-verified-green shrink-0">
              <span className="animate-ping absolute inset-0 rounded-full bg-verified-green opacity-75" />
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                className="text-[16px] text-on-surface-variant truncate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {messages[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          <span className="text-[12px] font-bold text-primary shrink-0 ml-4">Live</span>
        </div>
      </div>
    </section>
  )
}

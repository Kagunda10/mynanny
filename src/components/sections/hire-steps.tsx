'use client'

import { motion, useReducedMotion } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { PrimaryButton } from '@/components/ui/primary-button'
import { SectionHeader } from '@/components/ui/section-header'
import type { MarketingContent } from '@/lib/cms-types'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'

type HireStepsProps = {
  content?: MarketingContent['hireSteps']
}

export function HireSteps({ content = DEFAULT_MARKETING.hireSteps }: HireStepsProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="px-5 md:px-6 max-w-[1280px] mx-auto">
      <div className="bg-dark-ink rounded-[28px] md:rounded-[36px] py-12 md:py-16 text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center">
          <SectionEntrance className="lg:col-span-5">
            <SectionHeader
              title={content.title}
              subtitle={content.description}
              centered={false}
              titleClassName="text-white"
              subtitleClassName="text-white/75 text-[16px] md:text-[17px] max-w-md"
              className="mb-0"
            />
            <div className="mt-6">
              <PrimaryButton icon="bolt" href={content.ctaHref}>
                {content.ctaText}
              </PrimaryButton>
            </div>
          </SectionEntrance>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {content.steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex gap-3.5 p-4 md:p-5 rounded-2xl border transition-colors ${
                  step.isFinal
                    ? 'bg-white/10 border-white/20 sm:col-span-2'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] shrink-0 ${
                    step.isFinal ? 'bg-green-500 text-white' : 'bg-primary text-white'
                  }`}
                >
                  {step.number}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[15px] md:text-[16px] leading-snug">{step.title}</h3>
                  <p className="mt-1 text-[13px] md:text-[14px] text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

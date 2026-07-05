'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { SectionHeader } from '@/components/ui/section-header'
import type { MarketingContent } from '@/lib/cms-types'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'

type VettingPipelineProps = {
  content?: MarketingContent['vetting']
}

export function VettingPipeline({ content = DEFAULT_MARKETING.vetting }: VettingPipelineProps) {
  return (
    <section className="scroll-mt-28 px-5 md:px-6 max-w-[1280px] mx-auto py-12">
      <div className="bg-white rounded-[40px] py-16 md:py-12 px-5 md:px-12 overflow-hidden">
        <SectionHeader
          title={content.title}
          subtitle={<span className="text-primary font-bold text-[24px]">{content.passRate}</span>}
          subtitleClassName="mt-2"
        />

        <SectionEntrance>
          <div className="relative mx-auto flex max-w-md flex-col items-center gap-10 md:max-w-none md:flex-row md:items-start md:justify-between md:gap-12">
            <div className="absolute top-12 left-0 hidden h-1 w-full bg-outline-variant/30 md:block">
              <div className="h-full w-full origin-left animate-[draw_2s_ease_forwards] bg-primary" />
            </div>
            <div
              className="absolute top-10 bottom-10 left-1/2 w-px -translate-x-1/2 bg-outline-variant/30 md:hidden"
              aria-hidden
            />
            {content.steps.map((step) => (
              <div
                key={step.title}
                className="relative z-10 flex w-full max-w-[280px] flex-col items-center text-center md:w-1/5 md:max-w-none group"
              >
                <div
                  className={`mb-4 flex h-20 w-20 md:mb-6 md:h-24 md:w-24 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${
                    step.isFinal ? 'bg-primary shadow-lg' : 'border-2 border-primary bg-surface'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined !text-[32px] md:!text-[40px] ${
                      step.isFinal ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {step.icon}
                  </span>
                </div>
                <h4 className="mb-2 font-bold">{step.title}</h4>
                <p className="px-2 text-[12px] text-on-surface-variant md:px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </SectionEntrance>
      </div>
    </section>
  )
}

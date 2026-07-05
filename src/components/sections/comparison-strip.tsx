'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import type { MarketingContent } from '@/lib/cms-types'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'

type ComparisonStripProps = {
  content?: MarketingContent['comparison']
}

export function ComparisonStrip({ content = DEFAULT_MARKETING.comparison }: ComparisonStripProps) {
  return (
    <section className="py-12 px-5 md:px-6 max-w-[1280px] mx-auto">
      <div className="bg-surface-container-low rounded-[40px] py-12 px-5 max-w-4xl mx-auto">
        <SectionEntrance>
          <div className="double-bezel">
            <div className="double-bezel-inner">
              <h3 className="text-[24px] font-medium text-center mb-8">{content.title}</h3>
              <div className="grid grid-cols-3 gap-2 text-center items-center">
                {content.columns.map((col, i) => {
                  const highlighted = col.variant === 'highlighted'
                  return (
                    <div
                      key={col.label}
                      className={`p-4 ${i < content.columns.length - 1 ? 'border-r border-outline-variant/30' : ''} ${highlighted ? 'bg-primary/5 rounded-xl' : ''
                        }`}
                    >
                      <p
                        className={`text-[12px] font-bold uppercase tracking-widest mb-4 ${highlighted ? 'text-primary' : 'text-on-surface-variant/50'
                          }`}
                      >
                        {col.label}
                      </p>
                      <span
                        className={`material-symbols-outlined !text-[32px] ${highlighted ? 'text-verified-green' : 'text-error'
                          }`}
                      >
                        {highlighted ? 'check_circle' : 'close'}
                      </span>
                      <p className={`text-[12px] mt-2 ${highlighted ? 'font-bold text-primary' : ''}`}>{col.note}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </SectionEntrance>
      </div>
    </section>
  )
}

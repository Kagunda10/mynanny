'use client'

import { type ReactNode } from 'react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'

interface LegalPageLayoutProps {
  eyebrow: string
  title: string
  description?: string
  updated?: string
  children: ReactNode
}

export function LegalPageLayout({
  eyebrow,
  title,
  description,
  updated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-6 pb-20 md:pb-28">
      <section className="py-12 md:py-16 text-center max-w-3xl mx-auto">
        <SectionEntrance>
          <EyebrowPill icon="gavel" text={eyebrow} />
          <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] text-on-surface">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed">
              {description}
            </p>
          )}
          {updated && (
            <p className="mt-3 text-[12px] text-on-surface-variant/50 uppercase tracking-widest">
              Last updated {updated}
            </p>
          )}
        </SectionEntrance>
      </section>

      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  )
}

interface LegalProseProps {
  sections: Array<{
    id: string
    title: string
    paragraphs?: string[]
    list?: string[]
  }>
}

export function LegalProse({ sections }: LegalProseProps) {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <SectionEntrance key={section.id} delay={i * 0.04}>
          <section id={section.id} className="scroll-mt-28">
            <h2 className="text-[22px] md:text-[26px] font-semibold text-on-surface mb-4">
              {section.title}
            </h2>
            {section.paragraphs?.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="text-[15px] text-on-surface-variant leading-relaxed mb-4"
              >
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="space-y-2 mt-2">
                {section.list.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] text-on-surface-variant leading-relaxed"
                  >
                    <span className="material-symbols-outlined text-brand-pink !text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </SectionEntrance>
      ))}
    </div>
  )
}

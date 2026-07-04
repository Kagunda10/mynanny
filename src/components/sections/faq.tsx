'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { PrimaryButton } from '@/components/ui/primary-button'
import { SectionHeader } from '@/components/ui/section-header'
import { HOME_FAQ, type FaqItem } from '@/lib/faq-content'

interface FAQProps {
  items?: FaqItem[]
  title?: string
  description?: string
}

export function FAQ({
  items = HOME_FAQ,
  title = 'Frequently Asked Questions',
  description = "Can't find what you're looking for? Reach out to our support team.",
}: FAQProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-12">
      <SectionEntrance>
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-32 h-fit">
            <SectionHeader
              title={title}
              subtitle={description}
              centered={false}
              className="mb-0"
            />
            <PrimaryButton href="/contact" variant="secondary" className="mt-8">
              Contact Support
            </PrimaryButton>
          </div>

          <div className="md:col-span-8 space-y-6">
            {items.map((item, i) => (
              <details key={item.question} className="group double-bezel overflow-hidden" open={i === 0}>
                <summary className="flex justify-between items-center gap-4 p-6 cursor-pointer font-bold bg-white group-open:bg-surface-container-low transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="material-symbols-outlined shrink-0 transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="p-6 bg-white border-t border-outline-variant/30">
                  <p className="text-on-surface-variant">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </SectionEntrance>
    </section>
  )
}

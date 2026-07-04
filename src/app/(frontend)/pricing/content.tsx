'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { PrimaryButton } from '@/components/ui/primary-button'
import { VettingPipeline } from '@/components/sections/vetting-pipeline'
import { ComparisonStrip } from '@/components/sections/comparison-strip'
import { CoverageMap } from '@/components/sections/coverage-map'
import { GoogleReviews } from '@/components/sections/google-reviews'
import { FAQ } from '@/components/sections/faq'
import { MatchForm } from '@/components/sections/match-form'
import type {
  CoverageContent,
  FaqItem,
  FeeBreakdownItem,
  MarketingContent,
  RolePricing,
  TestimonialReview,
} from '@/lib/cms-types'
import { DEFAULT_COVERAGE, DEFAULT_PRICING, DEFAULT_PRICING_FAQ, DEFAULT_TESTIMONIALS } from '@/lib/defaults'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'

type PricingContentProps = {
  rolePricing?: RolePricing[]
  feeBreakdown?: FeeBreakdownItem[]
  lastUpdated?: string
  coverage?: CoverageContent
  testimonials?: TestimonialReview[]
  faqItems?: FaqItem[]
  aggregateRating?: number
  reviewCount?: number
  marketing?: MarketingContent
}

export function PricingContent({
  rolePricing = DEFAULT_PRICING.rolePricing,
  feeBreakdown = DEFAULT_PRICING.feeBreakdown,
  lastUpdated = DEFAULT_PRICING.lastUpdated,
  coverage = DEFAULT_COVERAGE,
  testimonials = DEFAULT_TESTIMONIALS,
  faqItems = DEFAULT_PRICING_FAQ,
  aggregateRating = 4.8,
  reviewCount = 450,
  marketing = DEFAULT_MARKETING,
}: PricingContentProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-12 md:pb-20">
        <SectionEntrance>
          <div className="text-center max-w-3xl mx-auto">
            <EyebrowPill icon="payments" text="Transparent pricing" />
            <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight text-on-surface">
              Real prices, not guesswork.
            </h1>
            <p className="mt-6 text-[18px] text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Every range below comes from actual placements this month across Nairobi.
              Your neighbourhood and the worker&apos;s experience shift the number.
            </p>
          </div>
        </SectionEntrance>
      </section>

      {/* Salary table */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-24">
        <SectionEntrance>
          <div className="double-bezel">
            <div className="double-bezel-inner !p-0 overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-container-low text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/50 rounded-t-[18px]">
                <div className="col-span-3">Role</div>
                <div className="col-span-4">Typical range</div>
                <div className="col-span-5">Note</div>
              </div>

              {rolePricing.map((item, i) => (
                <div key={item.role}>
                  <button
                    className={`
                      w-full text-left grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5
                      ${i < rolePricing.length - 1 ? 'border-b border-outline-variant/20' : ''}
                      hover:bg-chip-bg/40 transition-colors duration-200
                    `}
                    onClick={() => setExpandedRole(expandedRole === item.role ? null : item.role)}
                  >
                    <div className="md:col-span-3 flex items-center gap-2">
                      <span className="font-semibold text-on-surface text-[15px]">
                        {item.role}
                      </span>
                      {item.popular && (
                        <span className="text-[9px] bg-brand-pink/10 text-brand-pink px-1.5 py-0.5 rounded-full font-bold uppercase">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-4 flex items-baseline gap-1">
                      <span className="font-semibold text-[18px] text-on-surface tabular-nums">
                        KES {item.low.toLocaleString()} - {item.high.toLocaleString()}
                      </span>
                      <span className="text-[13px] text-on-surface-variant/50">{item.period}</span>
                    </div>
                    <div className="md:col-span-4 text-[14px] text-on-surface-variant">
                      {item.note}
                    </div>
                    <div className="md:col-span-1 flex items-center justify-end">
                      <motion.span
                        className="material-symbols-outlined text-on-surface-variant/40"
                        animate={{ rotate: expandedRole === item.role ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        expand_more
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedRole === item.role && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-b border-outline-variant/20">
                          <p className="text-[14px] text-on-surface-variant leading-relaxed max-w-2xl bg-surface-container-low rounded-2xl p-4">
                            {item.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </SectionEntrance>

        <SectionEntrance delay={0.1}>
          <p className="text-center text-[12px] text-on-surface-variant/50 mt-4">
            Rates from actual placements, {lastUpdated}. Updated monthly.
          </p>
        </SectionEntrance>
      </section>

      {/* Fee structure */}
      <section className="floating-slab my-12 md:my-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-24">
          <SectionEntrance>
            <div className="text-center mb-12">
              <h2 className="text-[32px] md:text-[44px] font-semibold text-white leading-[1.1]">
                How Mynanny charges.
              </h2>
              <p className="mt-4 text-white/50 text-[16px] max-w-xl mx-auto">
                Browsing is free. You only pay a one-time placement fee when you hire.
                After that, salary goes direct to the worker via M-Pesa.
              </p>
            </div>
          </SectionEntrance>

          <div className="max-w-2xl mx-auto space-y-3">
            {feeBreakdown.map((fee, i) => (
              <SectionEntrance key={fee.label} delay={i * 0.06}>
                <div className="flex items-center justify-between py-4 px-5 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[15px] text-white">{fee.label}</span>
                  <span
                    className={`text-[14px] font-semibold ${
                      fee.type === 'free'
                        ? 'text-verified-green'
                        : fee.type === 'fee'
                          ? 'text-star-amber'
                          : 'text-white/70'
                    }`}
                  >
                    {fee.value}
                  </span>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      {/* M-Pesa payment flow */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-16 md:py-24">
        <SectionEntrance>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[28px] md:text-[36px] font-semibold text-on-surface mb-4">
              Pay the way Nairobi works.
            </h2>
            <p className="text-on-surface-variant text-[16px] leading-relaxed">
              Placement fee via M-Pesa. Monthly salary direct to your worker.
              No bank transfers, no cash envelopes.
            </p>
          </div>
        </SectionEntrance>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: 'search',
              title: 'Browse free.',
              desc: 'View profiles, ratings, references, and salary expectations at no cost.',
            },
            {
              icon: 'handshake',
              title: 'Hire and pay once.',
              desc: 'One-time placement fee of 50% of the first month salary, via M-Pesa.',
            },
            {
              icon: 'repeat',
              title: 'Pay worker direct.',
              desc: 'Monthly salary goes straight to the worker. No ongoing platform fee.',
            },
          ].map((step, i) => (
            <SectionEntrance key={step.title} delay={i * 0.08}>
              <div className="double-bezel h-full">
                <div className="double-bezel-inner h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-secondary !text-[24px]">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-on-surface mb-2">{step.title}</h3>
                  <p className="text-[14px] text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </SectionEntrance>
          ))}
        </div>
      </section>

      {/* Why these prices — vetting + trust context */}
      <VettingPipeline content={marketing.vetting} />

      <ComparisonStrip content={marketing.comparison} />

      <CoverageMap content={coverage} />

      <GoogleReviews
        reviews={testimonials}
        aggregateRating={aggregateRating}
        reviewCount={reviewCount}
      />

      <FAQ
        items={faqItems}
        title="Pricing questions answered"
        description="Placement fees, refunds, and salary ranges. Transparent before you commit."
      />

      <MatchForm content={marketing.matchForm} />

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-24">
        <SectionEntrance>
          <div className="bg-primary rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[40px] font-semibold mb-4">
                Get an instant estimate.
              </h2>
              <p className="text-[16px] mb-8 max-w-md mx-auto opacity-90 leading-relaxed">
                Tell us what you need and your neighbourhood. We will show you real
                profiles with real prices in under a minute.
              </p>
              <PrimaryButton className="bg-white !text-brand-pink" href="/#match-form" icon="arrow_forward">
                Get matched free
              </PrimaryButton>
            </div>
          </div>
        </SectionEntrance>
      </section>
    </>
  )
}

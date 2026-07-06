'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { SectionHeader } from '@/components/ui/section-header'
import { PrimaryButton } from '@/components/ui/primary-button'
import { CountUp } from '@/components/motion/count-up'
import { SOSPhoneDemo } from '@/components/sections/sos-phone-demo'
import { CoverageMap } from '@/components/sections/coverage-map'
import { HireSteps } from '@/components/sections/hire-steps'
import { GoogleReviews } from '@/components/sections/google-reviews'
import { VideoTestimonial } from '@/components/sections/video-testimonial'
import { FAQ } from '@/components/sections/faq'
import { MatchForm } from '@/components/sections/match-form'
import type { CoverageContent, FaqItem, MarketingContent, TestimonialReview } from '@/lib/cms-types'
import { DEFAULT_COVERAGE, DEFAULT_HOW_IT_WORKS_FAQ, DEFAULT_TESTIMONIALS } from '@/lib/defaults'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'
import { motion } from 'motion/react'
import Link from 'next/link'

const TRADITIONAL_COMPARISON_ITEMS = [
  'Verbal references',
  'One-time transaction',
  'No contract',
  'Variable pricing',
] as const

const MYNANNY_COMPARISON_ITEMS = [
  {
    title: 'Deep Background Vetting',
    description: 'Police clearance & physical home verification.',
  },
  {
    title: 'Continuous Support',
    description: 'Ongoing mediation and replacement guarantee.',
  },
  {
    title: 'Transparent Fixed Pricing',
    description: "No hidden commissions or daily 'fee' tracking.",
  },
] as const

type WhyMyNannyContentProps = {
  coverage?: CoverageContent
  testimonials?: TestimonialReview[]
  faqItems?: FaqItem[]
  aggregateRating?: number
  reviewCount?: number
  marketing?: MarketingContent
}

export function WhyMyNannyContent({
  coverage = DEFAULT_COVERAGE,
  testimonials = DEFAULT_TESTIMONIALS,
  faqItems = DEFAULT_HOW_IT_WORKS_FAQ,
  aggregateRating = 4.8,
  reviewCount = 450,
  marketing = DEFAULT_MARKETING,
}: WhyMyNannyContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-chip-bg to-primary/20 blur-3xl opacity-20 md:opacity-100 -z-10" />
        <div className="max-w-[1280px] mx-auto px-5 md:px-6 text-center">
          <SectionEntrance>
            <EyebrowPill icon="verified" text="Nairobi's Most Trusted Network" />
            <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight text-on-surface max-w-3xl mx-auto">
              Why MyNanny is the gold standard for your family.
            </h1>
            <p className="mt-6 text-[18px] text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              We built the system Nairobi families deserve — rigorous vetting, transparent pricing,
              and continuous support so you never have to worry about who&apos;s caring for your children.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton href="/#match-form">Get Matched Free</PrimaryButton>
              <PrimaryButton variant="secondary" href="#vetting">
                View Vetting Process
              </PrimaryButton>
            </div>
          </SectionEntrance>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="overflow-visible py-20 px-5 md:px-6 max-w-[1280px] mx-auto">
        <SectionEntrance className="overflow-visible">
          <div className="mb-14 text-center md:mb-16">
            <h2 className="text-[34px] font-semibold tracking-tight text-on-surface md:text-[44px]">
              The MyNanny Difference
            </h2>
            <p className="mt-3 text-[16px] text-on-surface-variant md:text-[18px]">
              How we redefine domestic service recruitment.
            </p>
          </div>

          <div className="grid items-center gap-12 overflow-visible md:grid-cols-2 lg:gap-16">
            {/* Comparison Cards */}
            <div className="relative mx-auto w-full max-w-[380px] overflow-visible sm:max-w-[420px] md:mx-0 md:max-w-none">
              <div className="relative min-h-[380px] w-full overflow-visible sm:min-h-[420px] md:min-h-[440px]">
                <motion.div
                  className="absolute left-0 top-0 z-0 w-[min(calc(100%-1.5rem),340px)] rounded-[22px] border border-primary-fixed/25 bg-[#FFF9FA] p-6 shadow-[0_8px_24px_rgba(144,0,52,0.06)] sm:p-7 sm:w-[340px]"
                  style={{ rotate: -2.5 }}
                  initial={{ opacity: 0, x: -16, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-error text-white">
                      <span className="material-symbols-outlined !text-[16px]">close</span>
                    </span>
                    <p className="text-[15px] font-semibold text-on-surface-variant/75">
                      Traditional Bureaus
                    </p>
                  </div>
                  <ul className="space-y-3.5">
                    {TRADITIONAL_COMPARISON_ITEMS.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-[14px] leading-snug text-on-surface-variant/65"
                      >
                        <span className="material-symbols-outlined shrink-0 text-error !text-[16px]">
                          close
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="absolute left-7 top-16 z-10 w-[min(calc(100%-1.5rem),340px)] rounded-[22px] border border-primary/[0.08] bg-white p-6 shadow-[0_22px_50px_-14px_rgba(144,0,52,0.18)] transition-transform duration-500 hover:scale-[1.01] sm:left-[64px] sm:top-[72px] sm:p-7 sm:w-[340px] md:left-[72px] md:top-[76px]"
                  style={{ rotate: 0.5 }}
                  initial={{ opacity: 0, x: 16, y: 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="absolute right-5 top-5 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    BETTER
                  </span>
                  <div className="mb-5 flex items-center gap-3 pr-14">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <span
                        className="material-symbols-outlined !text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </span>
                    <p className="font-display text-[17px] font-semibold leading-tight text-primary md:text-[18px]">
                      The MyNanny Way
                    </p>
                  </div>
                  <ul className="space-y-4">
                    {MYNANNY_COMPARISON_ITEMS.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                          <span className="material-symbols-outlined !text-[14px]">check</span>
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold leading-snug text-on-surface">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-on-surface-variant/90">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Copy + stats */}
            <div className="md:pl-2 lg:pl-6">
              <h3 className="text-[26px] font-semibold leading-tight tracking-tight text-on-surface md:text-[32px]">
                Designed for the Modern Nairobi Parent
              </h3>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-on-surface-variant md:text-[16px]">
                We understand that in a bustling city like Nairobi, your peace of mind is priceless.
                That&apos;s why we&apos;ve moved away from the chaotic &apos;bureau&apos; model to a
                digital-first, human-centered experience.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-[18px] bg-chip-bg px-4 py-7 sm:px-5">
                  <CountUp
                    target={98}
                    suffix="%"
                    className="font-display block text-[38px] font-semibold leading-none text-primary sm:text-[44px]"
                  />
                  <p className="mt-2.5 text-[13px] font-medium text-on-surface sm:text-[14px]">
                    Retention Rate
                  </p>
                </div>
                <div className="rounded-[18px] bg-chip-bg px-4 py-7 sm:px-5">
                  <CountUp
                    target={1200}
                    suffix="+"
                    className="font-display block text-[38px] font-semibold leading-none text-secondary sm:text-[44px]"
                  />
                  <p className="mt-2.5 text-[13px] font-medium text-on-surface sm:text-[14px]">
                    Families Served
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* Vetting Bento Grid */}
      <section id="vetting" className="floating-slab my-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <SectionEntrance>
            <SectionHeader
              eyebrow={<EyebrowPill icon="shield" text="Our 5-Step Integrity Engine" color="secondary" />}
              title="Every nanny passes our gauntlet."
              subtitle="Before meeting your family, every candidate is screened through a rigorous multi-stage process."
              titleClassName="text-white"
              subtitleClassName="text-white/50 text-[16px] max-w-xl mx-auto"
              className="mb-14"
            />
          </SectionEntrance>

          <SectionEntrance delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
              <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[12px] font-bold text-white/30 tracking-widest">STEP 01</span>
                  <h3 className="mt-2 text-[20px] font-semibold text-white">Digital Forensics</h3>
                  <p className="mt-2 text-[14px] text-white/50">
                    Social media audit, phone verification, and digital identity cross-referencing.
                  </p>
                </div>
                <span className="material-symbols-outlined text-white/20 !text-[40px] self-end">
                  fingerprint
                </span>
              </div>

              <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <span className="text-[12px] font-bold text-white/30 tracking-widest">STEP 02</span>
                  <h3 className="mt-2 text-[20px] font-semibold text-white">In-Person Audit</h3>
                  <p className="mt-2 text-[14px] text-white/50">
                    Face-to-face interview at our offices with behavioral assessment.
                  </p>
                </div>
                <span className="material-symbols-outlined text-white/20 !text-[40px] self-end">
                  person_search
                </span>
              </div>

              <div className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-primary to-primary-container rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[12px] font-bold text-white/50 tracking-widest">STEP 03</span>
                  <h3 className="mt-2 text-[20px] font-semibold text-white">
                    Medical &amp; First Aid
                  </h3>
                  <p className="mt-2 text-[14px] text-white/70">
                    Full medical clearance and certified first-aid training verification.
                  </p>
                </div>
                <span className="material-symbols-outlined text-white/30 !text-[56px] self-end">
                  medical_services
                </span>
              </div>

              <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <span className="text-[12px] font-bold text-white/30 tracking-widest">STEP 04</span>
                  <h3 className="mt-2 text-[20px] font-semibold text-white">House-Level Vetting</h3>
                  <p className="mt-2 text-[14px] text-white/50">
                    Home visit to verify residence and family references.
                  </p>
                </div>
                <span className="material-symbols-outlined text-white/20 !text-[40px] self-end">
                  home_pin
                </span>
              </div>

              <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[12px] font-bold text-white/30 tracking-widest">STEP 05</span>
                  <h3 className="mt-2 text-[20px] font-semibold text-white">Trial Period Shield</h3>
                  <p className="mt-2 text-[14px] text-white/50">
                    Supervised trial period with check-ins, feedback loops, and replacement
                    guarantee.
                  </p>
                </div>
                <span className="material-symbols-outlined text-white/20 !text-[40px] self-end">
                  verified_user
                </span>
              </div>
            </div>
          </SectionEntrance>
        </div>
      </section>

      {/* Safety Features - Interactive SOS Phone Demo */}
      <SOSPhoneDemo />

      {/* Hire flow */}
      <HireSteps />

      {/* Nairobi Coverage */}
      <CoverageMap content={coverage} />

      {/* Social proof */}
      <GoogleReviews
        reviews={testimonials}
        aggregateRating={aggregateRating}
        reviewCount={reviewCount}
      />

      <VideoTestimonial />

      {/* Press / Featured In */}
      <section className="py-16 border-y border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-6">
          <SectionEntrance>
            <p className="text-center text-[12px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-8">
              Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-40 grayscale">
              {['BusinessDaily', 'Standard', 'Nation', 'Capital FM'].map((outlet) => (
                <span
                  key={outlet}
                  className="text-[20px] md:text-[24px] font-semibold text-on-surface"
                >
                  {outlet}
                </span>
              ))}
            </div>
          </SectionEntrance>
        </div>
      </section>

      <FAQ
        items={faqItems}
        title="Common questions about how we work"
        description="Everything from vetting to payments. Still unsure? Our Nairobi support team replies within hours."
      />

      <MatchForm content={marketing.matchForm} />

      {/* CTA Slab */}
      <section className="my-20 px-5 md:px-6 max-w-[1280px] mx-auto">
        <div className="rounded-[40px] bg-primary overflow-hidden">
          <div className="max-w-[800px] mx-auto px-6 py-20 md:py-28 text-center">
            <SectionEntrance>
            <h2 className="text-[36px] md:text-[52px] font-semibold text-white leading-[1.08]">
              Ready to find your perfect match?
            </h2>
            <p className="mt-6 text-[18px] text-white/70 max-w-lg mx-auto leading-relaxed">
              Join over 1,200 Nairobi families who trust MyNanny with their most precious
              responsibility.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton href="/#match-form" className="bg-white !text-brand-pink">
                Get Matched Free
              </PrimaryButton>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </SectionEntrance>
          </div>
        </div>
      </section>
    </>
  )
}

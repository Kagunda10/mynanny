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
      <section className="py-20 px-5 md:px-6 max-w-[1280px] mx-auto">
        <div className="bg-surface-container-low rounded-[40px] py-16 md:py-20 px-5 md:px-12">
          <SectionEntrance>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Comparison Cards */}
              <div className="relative min-h-[420px] flex items-center justify-center">
                <motion.div
                  className="absolute w-[280px] md:w-[300px] bg-white/60 backdrop-blur-sm border border-outline-variant/40 rounded-2xl p-6 shadow-sm"
                  style={{ rotate: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-5">
                    Traditional Bureaus
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Verbal references only',
                      'One-time transaction',
                      'No written contract',
                      'Variable pricing',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[14px] text-on-surface-variant/70">
                        <span className="material-symbols-outlined text-error !text-[20px]">close</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  className="relative ml-20 mt-12 md:ml-24 w-[280px] md:w-[300px] bg-white border-2 border-primary/20 rounded-2xl p-6 shadow-xl z-10 hover:scale-[1.02] transition-transform duration-500"
                  style={{ rotate: 1 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-5">
                    The MyNanny Way
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Deep Background Vetting',
                      'Continuous Support',
                      'Transparent Fixed Pricing',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[14px] font-medium text-on-surface">
                        <span className="material-symbols-outlined text-verified-green !text-[20px]">
                          check_circle
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="double-bezel">
                  <div className="double-bezel-inner double-bezel-lift text-center">
                    <CountUp target={98} suffix="%" className="text-[48px] font-semibold text-primary" />
                    <p className="mt-2 text-[14px] text-on-surface-variant">Family Retention Rate</p>
                  </div>
                </div>
                <div className="double-bezel">
                  <div className="double-bezel-inner double-bezel-lift text-center">
                    <CountUp target={1200} suffix="+" className="text-[48px] font-semibold text-secondary" />
                    <p className="mt-2 text-[14px] text-on-surface-variant">Families Served</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionEntrance>
        </div>
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

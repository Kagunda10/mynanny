'use client'

import { motion } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { PrimaryButton } from '@/components/ui/primary-button'
import { FAQ } from '@/components/sections/faq'
import { CountUp } from '@/components/motion/count-up'
import { EarningsCalculator } from '@/components/sections/earnings-calculator'
import { SOSPhoneDemo } from '@/components/sections/sos-phone-demo'
import Image from 'next/image'

/* ── Data ────────────────────────────────────────────────────── */

const WORKER_AVATARS = [
  '/images/workers/mary.jpg',
  '/images/workers/faith.jpg',
  '/images/workers/joyce.jpg',
]

const ZIGZAG_SECTIONS = [
  {
    tag: 'Priority 01',
    title: 'Your safety is non-negotiable',
    description:
      'We vet families as strictly as we vet workers. Every home you enter is registered, and your location is tracked in real-time during shifts.',
    image: '/images/join/safety.jpg',
    features: [
      { icon: 'sos', label: 'One-tap SOS alert' },
      { icon: 'health_and_safety', label: 'Worker insurance coverage' },
      { icon: 'support_agent', label: '24/7 support line' },
    ],
    imageFirst: true,
  },
  {
    tag: 'Priority 02',
    title: 'Transparent pay. Every shilling accounted for.',
    description:
      'No more chasing clients for payment. Mynanny holds funds in escrow and releases them instantly to your M-Pesa once the job is complete.',
    image: '/images/join/payment.jpg',
    features: [
      { icon: 'payments', label: 'M-Pesa payouts every Friday' },
      { icon: 'schedule', label: 'Payout in under 2 hours' },
      { icon: 'receipt_long', label: 'Detailed pay breakdown' },
    ],
    imageFirst: false,
  },
  {
    tag: 'Priority 03',
    title: 'You are a professional. We treat you like one.',
    description:
      'We provide free training and professional uniforms to our top performers. You are not just a worker; you are a Mynanny Professional.',
    image: '/images/join/training.jpg',
    features: [
      { icon: 'school', label: 'Free skills training' },
      { icon: 'badge', label: 'Professional certifications' },
      { icon: 'workspace_premium', label: 'Career growth pathway' },
    ],
    imageFirst: true,
  },
]

const ONBOARDING_STEPS = [
  {
    num: '01',
    title: 'Apply Online',
    desc: 'Fill out the basic info and upload your ID through the app.',
  },
  {
    num: '02',
    title: 'Document Verification',
    desc: 'We verify your police clearance and reference history.',
  },
  {
    num: '03',
    title: 'Skills Assessment',
    desc: 'Visit our Nairobi office for a quick competency chat.',
  },
  {
    num: '04',
    title: 'Training Module',
    desc: 'Attend a 2-hour safety and platform ethics briefing.',
  },
  {
    num: '05',
    title: 'Get Matched',
    desc: "Switch on your \"Available\" toggle and start earning!",
  },
]

const TESTIMONIALS = [
  {
    name: 'Faith K.',
    initials: 'FK',
    color: 'bg-primary-fixed text-primary',
    quote:
      'I used to wait weeks for my salary. Now with Mynanny, I get my pay every Friday directly to M-Pesa. It has changed my life.',
  },
  {
    name: 'Sarah O.',
    initials: 'SO',
    color: 'bg-secondary-fixed text-secondary',
    quote:
      'The safety features give me peace of mind. I know that someone is looking out for me while I am at work.',
  },
  {
    name: 'Joyce M.',
    initials: 'JM',
    color: 'bg-tertiary-fixed text-tertiary',
    quote:
      'Best domestic app in Nairobi. The families are respectful and the support team actually listens to workers.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'How do I get paid?',
    answer:
      'You get paid every Friday directly to your M-Pesa. Mynanny holds funds in escrow and releases them once jobs are confirmed complete. There are no hidden deductions.',
  },
  {
    question: 'What training is provided?',
    answer:
      'We provide free training modules covering child safety, first aid, nutrition, elderly care, and professional ethics. Top performers also receive professional uniforms and advanced certifications.',
  },
  {
    question: 'Can I choose my hours?',
    answer:
      'Yes. You can toggle between full-time, part-time, or on-demand availability in the app. You control which jobs to accept and when you work.',
  },
  {
    question: 'What if there is an emergency?',
    answer:
      'Every worker has access to a one-tap SOS button in the Mynanny app. When activated, our 24/7 rapid response team in Nairobi is alerted along with your emergency contacts. We also provide worker insurance coverage.',
  },
]

/* ── Component ───────────────────────────────────────────────── */

export function JoinContent() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <EyebrowPill icon="badge" text="Join as a worker" />
            <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight mb-4">
              Join Nairobi&apos;s most trusted nanny{' '}
              <span className="text-brand-pink">network.</span>
            </h1>
            <p className="text-[18px] md:text-[20px] leading-relaxed text-on-surface-variant max-w-xl mb-8">
              Earn more. Grow your skills. Be valued.
            </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PrimaryButton href="https://forms.gle/your-google-form-url" target="_blank" rel="noopener noreferrer">Start your application</PrimaryButton>
                <PrimaryButton variant="secondary" href="#process">
                  See how it works
                </PrimaryButton>
              </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {WORKER_AVATARS.map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-surface-container-high relative overflow-hidden"
                  >
                    <Image src={src} alt={`Worker avatar ${i + 1}`} fill className="object-cover" sizes="40px" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-on-surface-variant">
                <span className="text-brand-pink font-bold">
                  <CountUp target={2400} suffix="+" />
                </span>{' '}
                Nannies already earning
              </p>
            </div>
          </motion.div>

          {/* Right — Profile Card */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="double-bezel">
              <div className="double-bezel-inner flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-surface-container-high relative">
                    <Image
                      className="object-cover"
                      src={WORKER_AVATARS[0]}
                      alt="Mary Wanjiku profile"
                      fill
                      sizes="112px"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-verified-green text-white p-1 rounded-full border-4 border-white">
                    <span className="material-symbols-outlined !text-[16px]">verified</span>
                  </div>
                </div>
                <h3 className="text-[18px] font-bold mb-1">Mary Wanjiku</h3>
                <p className="text-on-surface-variant text-sm mb-4">
                  Specialist: Newborn Care &amp; Nutrition
                </p>

                <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full mb-6">
                  <span
                    className="material-symbols-outlined text-star-amber !text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="text-sm font-medium">4.9 (128 reviews)</span>
                </div>

                <div className="w-full space-y-0">
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant">M-Pesa Verified</span>
                    <span className="material-symbols-outlined text-verified-green">
                      check_circle
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/30">
                    <span className="text-on-surface-variant">Police Clearance</span>
                    <span className="material-symbols-outlined text-verified-green">
                      check_circle
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-on-surface-variant">Earnings/Mo</span>
                    <span className="text-brand-pink font-bold">KES 32,000</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Earnings Comparison Slab ──────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-24">
        <SectionEntrance>
          <div className="bg-dark-ink rounded-[40px] mx-0 p-6 md:p-12 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[28px] md:text-[36px] font-semibold mb-4">
                  Keep what you earn.
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  We believe domestic workers deserve transparency. No hidden
                  &ldquo;bureau fees&rdquo; taken from your daily wages. You see
                  your rate, you keep your rate.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-pink/20 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-brand-pink">payments</span>
                  </div>
                  <p className="text-sm font-medium">Payments processed via M-Pesa and on your terms</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Traditional Bureau */}
                <div className="bg-white/5 border border-white/10 rounded-[18px] p-6">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
                    Traditional Bureau
                  </p>
                  <p className="text-[36px] md:text-[44px] font-bold mb-1">
                    <CountUp target={60} suffix="%" className="text-error" />
                  </p>
                  <p className="text-sm text-error">Take-home Pay</p>
                  <p className="text-xs mt-4 text-white/30">Bureau cuts &amp; fees</p>
                </div>
                {/* Mynanny */}
                <div className="bg-primary-container rounded-[18px] p-6 border border-brand-pink">
                  <p className="text-[10px] text-white/60 uppercase tracking-widest mb-2">
                    Mynanny App
                  </p>
                  <p className="text-[36px] md:text-[44px] font-bold mb-1">
                    <CountUp target={92} suffix="%" className="text-verified-green" />
                  </p>
                  <p className="text-sm text-verified-green">Take-home Pay</p>
                  <p className="text-xs mt-4 text-white/50">Small platform fee</p>
                </div>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* ── 2b. Earnings Calculator ──────────────────────────── */}
      <EarningsCalculator />

      {/* ── 3. Zig-Zag Values ────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-12 md:py-20 space-y-24">
        {ZIGZAG_SECTIONS.map((s, idx) => (
          <SectionEntrance key={idx}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className={s.imageFirst ? 'order-2 md:order-1' : 'order-2'}>
                <div className="w-full aspect-square bg-surface-container-high rounded-[40px] overflow-hidden relative">
                  <Image
                    className="object-cover"
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              {/* Text */}
              <div className={s.imageFirst ? 'order-1 md:order-2' : 'order-1'}>
                <span className="text-brand-pink font-bold uppercase tracking-widest text-xs">
                  {s.tag}
                </span>
                <h2 className="text-[28px] md:text-[36px] font-semibold mt-2 mb-4">
                  {s.title}
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-4">
                  {s.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-brand-pink">{f.icon}</span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionEntrance>
        ))}
      </section>

      {/* ── 4. Onboarding Process ────────────────────────────── */}
      <section id="process" className="px-5 md:px-6 max-w-[1280px] mx-auto scroll-mt-28">
        <div className="bg-surface-container-low rounded-[40px] py-16 md:py-24 px-5 md:px-12">
          <SectionEntrance>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-[28px] md:text-[36px] font-semibold mb-4">
                5 Steps to Start Earning
              </h2>
              <p className="text-on-surface-variant">
                Our vetting process takes about 48 hours. Once approved, you can
                start accepting jobs immediately.
              </p>
            </div>
          </SectionEntrance>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {ONBOARDING_STEPS.map((step, i) => (
              <SectionEntrance key={step.num} delay={i * 0.08}>
                <div className="double-bezel h-full">
                  <div className="double-bezel-inner h-full">
                    <span className="text-[48px] font-bold text-primary/10 block mb-4">
                      {step.num}
                    </span>
                    <h4 className="text-[16px] font-bold mb-2">{step.title}</h4>
                    <p className="text-on-surface-variant text-sm">{step.desc}</p>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Interactive SOS Phone Demo ──────────────────── */}
      <SOSPhoneDemo />

      {/* ── 6. Worker Testimonials ───────────────────────────── */}
      <section className="px-5 md:px-6 max-w-[1280px] mx-auto py-12">
        <div className="bg-white rounded-[40px] py-16 md:py-24 px-5 md:px-12">
          <SectionEntrance>
            <h2 className="text-[28px] md:text-[36px] font-semibold text-center mb-12">
              What our community says
            </h2>
          </SectionEntrance>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <SectionEntrance key={t.name} delay={i * 0.1}>
                <div className="double-bezel h-full">
                  <div className="double-bezel-inner h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center font-bold text-lg`}>
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <div className="flex text-star-amber">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <span
                              key={si}
                              className="material-symbols-outlined !text-[16px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-on-surface-variant flex-1 leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ Section ───────────────────────────────────── */}
      <FAQ
        items={FAQ_ITEMS}
        title="Frequently Asked Questions"
        description="Common questions from workers joining Mynanny."
      />

      {/* ── 8. CTA Slab ──────────────────────────────────────── */}
      <section id="apply" className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-24 scroll-mt-28">
        <SectionEntrance>
          <div className="bg-primary rounded-[40px] p-8 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[48px] font-semibold mb-4">
                Ready to start earning?
              </h2>
              <p className="text-[16px] md:text-[18px] mb-10 max-w-xl mx-auto opacity-90 leading-relaxed">
                Join thousands of professional nannies and housekeepers who
                have found a safer, better-paying way to work in Nairobi.
              </p>
              <div className="flex justify-center">
                <PrimaryButton
                  href="https://forms.gle/your-google-form-url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white !text-brand-pink"
                  icon="arrow_forward"
                >
                  Start your application
                </PrimaryButton>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>
    </>
  )
}

'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { PrimaryButton } from '@/components/ui/primary-button'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { ParallaxBlob } from '@/components/motion/parallax-blob'
import { DoubleBevelCard } from '@/components/ui/double-bezel-card'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { COMPANY } from '@/lib/site-content'
import { channelLabel } from '@/lib/contact-content'
import type { ContactIntent, ContactPageContent } from '@/lib/cms-types'
import { DEFAULT_CONTACT_PAGE } from '@/lib/extended-defaults'
import { submitInquiryAction } from '@/lib/actions/submit-inquiry'

function IntentAction({ intent }: { intent: ContactIntent }) {
  const external =
    intent.actionHref.startsWith('http') ||
    intent.actionHref.startsWith('mailto') ||
    intent.actionHref.startsWith('tel')

  const className =
    'inline-flex w-fit max-w-full items-center gap-1.5 text-[14px] font-semibold text-brand-pink hover:underline'

  if (external) {
    return (
      <a
        href={intent.actionHref}
        target={intent.actionHref.startsWith('http') ? '_blank' : undefined}
        rel={intent.actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {intent.actionLabel}
        <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
      </a>
    )
  }

  return (
    <Link href={intent.actionHref} className={className}>
      {intent.actionLabel}
      <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
    </Link>
  )
}

function renderHeroTitle(title: string) {
  const match = title.match(/^(.*?\b)(fast)(\s*[.!?]?)$/i)
  if (!match) return title
  return (
    <>
      {match[1]}
      <span className="text-brand-pink">{match[2]}</span>
      {match[3]}
    </>
  )
}

function IntentRouteCard({
  intent,
  isSelected,
  onSelect,
  index,
  reduceMotion,
}: {
  intent: ContactIntent
  isSelected: boolean
  onSelect: (id: string) => void
  index: number
  reduceMotion: boolean | null
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: 0.12 + index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className={`h-full rounded-[20px] border transition-shadow ${
        isSelected
          ? 'border-brand-pink/40 bg-white shadow-[0_12px_32px_rgba(236,0,140,0.08)] ring-2 ring-brand-pink/20'
          : 'border-outline-variant/15 bg-surface/80 hover:border-brand-pink/20 hover:shadow-md'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(intent.id)}
        className="w-full text-left p-4 flex flex-col gap-2.5 min-h-[132px] rounded-[20px] focus-visible:outline-2 focus-visible:outline-primary"
        aria-pressed={isSelected}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isSelected ? 'bg-brand-pink/15' : 'bg-primary/10'
            }`}
          >
            <span
              className={`material-symbols-outlined !text-[20px] ${
                isSelected ? 'text-brand-pink' : 'text-primary'
              }`}
            >
              {intent.icon}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[14px] leading-snug text-on-surface">{intent.title}</h3>
            <p className="text-[11px] text-on-surface-variant/75 mt-1 leading-relaxed">
              {channelLabel(intent.bestChannel)}
              <span className="mx-1 text-outline-variant/35">|</span>
              {intent.responseTime}
            </p>
          </div>
        </div>
        <p className="text-[13px] text-on-surface-variant leading-relaxed line-clamp-2">
          {intent.summary}
        </p>
      </button>
      <div className="px-4 pb-3.5 -mt-1 border-t border-outline-variant/10">
        <IntentAction intent={intent} />
      </div>
    </motion.div>
  )
}

type ContactContentProps = {
  contact?: ContactPageContent
}

export function ContactContent({ contact = DEFAULT_CONTACT_PAGE }: ContactContentProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [inquiryType, setInquiryType] = useState(contact.inquiryTypes[0]?.value ?? 'hire')
  const reduceMotion = useReducedMotion()

  const activeIntent =
    contact.intents.find((item) => item.id === inquiryType) ??
    contact.intents.find((item) => item.id === 'other') ??
    contact.intents[0]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      setError(null)
      const result = await submitInquiryAction({
        type: 'contact',
        inquiryType: String(data.get('inquiry') ?? inquiryType),
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        neighborhood: String(data.get('neighbourhood') ?? ''),
        message: String(data.get('message') ?? ''),
        service: String(data.get('mpesa') ?? ''),
      })

      if (result.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setError(result.error ?? 'Something went wrong. Please try WhatsApp or email instead.')
      }
    })
  }

  function selectIntent(id: string) {
    if (id === 'other') return
    setInquiryType(id)
    requestAnimationFrame(() => {
      document.getElementById('contact-form')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  const formTips =
    inquiryType === 'other'
      ? ['A clear subject line', 'Your registered phone or email', 'What you already tried']
      : (contact.intents.find((i) => i.id === inquiryType)?.includeWhenContacting ?? [])

  return (
    <>
      {/* Hero + intent routing */}
      <section className="scroll-mt-28 relative max-w-[1280px] mx-auto px-5 md:px-6 pt-12 md:pt-16 pb-16 md:pb-20 overflow-hidden">
        <ParallaxBlob
          className="pointer-events-none absolute -top-16 right-0 w-[420px] h-[420px]"
          duration={5}
          distance={14}
        >
          <div className="w-full h-full rounded-full bg-primary/8 blur-3xl opacity-70" />
        </ParallaxBlob>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            className="lg:col-span-5"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <EyebrowPill icon="support_agent" text="Support & contact" />

            <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight">
              {renderHeroTitle(contact.heroTitle)}
            </h1>

            <p className="mt-5 text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed max-w-md">
              {contact.heroDescription}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
              <motion.a
                href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20MyNanny%2C%20I%20need%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-[#25D366]/20 hover:opacity-95 active:scale-[0.98] transition-all"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span className="material-symbols-outlined !text-[20px]">chat</span>
                <span className="whitespace-nowrap">WhatsApp hiring</span>
              </motion.a>
              <motion.a
                href={`tel:${COMPANY.phones[0].replace(/\s/g, '')}`}
                className="inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface px-5 py-2.5 text-[14px] font-semibold text-on-surface hover:bg-surface-container transition-colors active:scale-[0.98]"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <span className="material-symbols-outlined !text-[20px]">call</span>
                <span className="whitespace-nowrap">{COMPANY.phones[0]}</span>
              </motion.a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 md:gap-3">
              {contact.slas.slice(0, 3).map((sla, i) => (
                <motion.div
                  key={sla.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.25 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-2xl border border-outline-variant/15 bg-surface-container-low/50 px-3 py-3 md:px-3.5 md:py-3.5"
                >
                  <p className="text-[18px] md:text-[20px] font-semibold text-on-surface tabular-nums leading-none">
                    {sla.value}
                  </p>
                  <p className="text-[10px] md:text-[11px] font-semibold text-on-surface-variant mt-1.5 leading-snug">
                    {sla.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <DoubleBevelCard hover={false} className="overflow-hidden">
                <div className="double-bezel-inner !p-0">
                  <div className="bg-gradient-to-br from-dark-ink via-dark-ink to-primary/30 px-5 py-5 md:px-6 md:py-6">
                    <h2 className="text-[20px] md:text-[22px] font-semibold text-white leading-tight">
                      Pick your topic
                    </h2>
                    <p className="mt-1.5 text-[13px] md:text-[14px] text-white/55 max-w-md leading-relaxed">
                      Tap a path to pre-fill the form. Each route shows what to include so we reply
                      once, not three times.
                    </p>
                  </div>
                  <div className="bg-surface-container-low/40 px-4 py-4 md:px-5 md:py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contact.intents.map((intent, i) => (
                        <IntentRouteCard
                          key={intent.id}
                          intent={intent}
                          isSelected={inquiryType === intent.id}
                          onSelect={selectIntent}
                          index={i}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </DoubleBevelCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response SLAs - full width on mobile, no side squeeze */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="rounded-[28px] md:rounded-[40px] bg-dark-ink overflow-hidden">
          <div className="px-5 md:px-8 py-12 md:py-16">
            <SectionEntrance>
              <div className="mb-8 md:mb-10">
                <h2 className="text-[26px] md:text-[36px] font-semibold text-white leading-[1.1]">
                  When to expect a reply
                </h2>
                <p className="mt-3 text-white/60 text-[14px] md:text-[15px] max-w-lg leading-relaxed">
                  Disputes need written email to {COMPANY.supportEmail} within 24 hours of the
                  incident.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {contact.slas.map((sla) => (
                  <div
                    key={sla.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:py-5"
                  >
                    <p className="text-[26px] md:text-[28px] font-semibold text-white tabular-nums">
                      {sla.value}
                    </p>
                    <p className="text-[13px] font-semibold text-white/90 mt-1 leading-snug">
                      {sla.label}
                    </p>
                    <p className="text-[11px] text-white/45 mt-1">{sla.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-white/35 mt-8">
                {COMPANY.legalName} · Nairobi · Est. {COMPANY.founded}
              </p>
            </SectionEntrance>
          </div>
        </div>
      </section>

      {/* Dispute path + refund rules */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <SectionEntrance>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-[24px] md:text-[28px] font-semibold leading-tight">
                How disputes are handled
              </h2>
              <p className="mt-2 text-[14px] text-on-surface-variant leading-relaxed max-w-md">
                Three steps. Email support within 24 hours of the incident for a formal review.
              </p>
            </div>
            <div className="lg:col-span-7">
              <h2 className="text-[24px] md:text-[28px] font-semibold leading-tight">
                Home nanny refund rules at a glance
              </h2>
              <p className="mt-2 text-[14px] text-on-surface-variant leading-relaxed">
                From our published terms. Other service types may differ.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-5">
              {contact.disputeSteps.map((step) => (
                <div key={step.step} className="flex gap-4 items-start">
                  <span className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-[14px]">
                    {step.step}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-bold text-[15px]">{step.title}</h3>
                    <p className="text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href="/terms"
                className="inline-flex w-fit items-center gap-1 text-[14px] font-semibold text-brand-pink hover:underline"
              >
                Full refund policy in Terms
                <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="double-bezel">
                <div className="double-bezel-inner">
                  <div className="grid gap-3">
                    {contact.refundRules.map((rule) => (
                      <div
                        key={rule.scenario}
                        className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center gap-1 sm:gap-6 rounded-xl bg-surface-container-low/60 px-4 py-3"
                      >
                        <span className="text-[14px] text-on-surface leading-snug">{rule.scenario}</span>
                        <span className="text-[14px] font-semibold text-primary sm:text-right whitespace-nowrap">
                          {rule.outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* Form + channels */}
      <section
        id="contact-form"
        className="scroll-mt-28 max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-semibold leading-tight">Direct lines</h2>
              <p className="mt-2 text-[14px] text-on-surface-variant leading-relaxed">
                Email, phone, or WhatsApp. Self-serve links below if you can resolve it faster.
              </p>
            </div>

            <SectionEntrance className="flex flex-col gap-4">
              {[
                {
                  icon: 'mail',
                  label: 'General enquiries',
                  value: COMPANY.email,
                  href: `mailto:${COMPANY.email}`,
                },
                {
                  icon: 'support_agent',
                  label: 'Support, disputes, payments',
                  value: COMPANY.supportEmail,
                  href: `mailto:${COMPANY.supportEmail}`,
                },
                ...COMPANY.phones.map((phone, index) => ({
                  icon: 'call' as const,
                  label: index === 0 ? 'Primary phone' : 'Secondary phone',
                  value: phone,
                  href: `tel:${phone.replace(/\s/g, '')}`,
                })),
              ].map((item) => (
                <div key={`${item.label}-${item.value}`} className="double-bezel">
                  <div className="double-bezel-inner flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary !text-[22px]">
                        {item.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/50">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        className="text-[15px] md:text-[16px] font-semibold text-on-surface hover:text-brand-pink transition-colors mt-0.5 block break-all sm:break-normal"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=Hi%20MyNanny%2C%20I%20need%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 md:p-5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-[22px] hover:bg-[#25D366]/15 transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white !text-[22px]">chat</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-on-surface">WhatsApp us</p>
                  <p className="text-[13px] text-on-surface-variant">Fastest for hiring questions</p>
                </div>
              </a>

              <div className="double-bezel">
                <div className="double-bezel-inner">
                  <p className="text-[13px] font-semibold text-on-surface mb-3">Self-serve first</p>
                  <ul className="space-y-2">
                    {contact.selfServiceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-[14px] font-medium text-on-surface hover:text-brand-pink transition-colors inline-flex items-center gap-1"
                        >
                          {link.label}
                          <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-[22px] border border-outline-variant/20 bg-surface-container-low/50">
                <p className="text-[13px] text-on-surface-variant leading-relaxed">
                  We comply with the Kenya Data Protection Act (2019). Your full home address is only
                  shared with a matched worker after a confirmed booking. Data questions:{' '}
                  <a href={`mailto:${COMPANY.supportEmail}`} className="text-brand-pink font-semibold">
                    {COMPANY.supportEmail}
                  </a>
                  .
                </p>
              </div>
            </SectionEntrance>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-semibold leading-tight">
                Send a detailed message
              </h2>
              <p className="mt-2 text-[14px] text-on-surface-variant leading-relaxed">
                Choose a topic so we route it to the right queue.
              </p>
            </div>

            <SectionEntrance delay={0.08}>
              <div className="double-bezel">
                <div className="double-bezel-inner">
                  {submitted ? (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-10 md:py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-verified-green/10 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-verified-green !text-[32px]">
                          check_circle
                        </span>
                      </div>
                      <h3 className="text-[24px] font-semibold mb-2">Message queued</h3>
                      <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed text-[15px]">
                        For urgent hiring, WhatsApp is still faster. Disputes should also copy{' '}
                        {COMPANY.supportEmail} for a formal review.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="inquiry" className="block text-[13px] font-semibold mb-2">
                            What is this about? *
                          </label>
                          <select
                            id="inquiry"
                            name="inquiry"
                            required
                            value={inquiryType}
                            onChange={(e) => setInquiryType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors"
                          >
                            {contact.inquiryTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={inquiryType}
                            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="rounded-xl bg-chip-bg/60 border border-brand-pink/10 px-4 py-3">
                              <p className="text-[12px] font-bold text-brand-pink mb-2">
                                {inquiryType === 'other'
                                  ? 'Include in your message'
                                  : `Include for ${activeIntent.title.toLowerCase()}`}
                              </p>
                              <ul className="space-y-1.5">
                                {formTips.map((tip) => (
                                  <li
                                    key={tip}
                                    className="flex items-start gap-2 text-[13px] text-on-surface-variant"
                                  >
                                    <span className="material-symbols-outlined text-verified-green !text-[16px] shrink-0 mt-0.5">
                                      check
                                    </span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-[13px] font-semibold mb-2">
                              Your name *
                            </label>
                            <input
                              id="name"
                              name="name"
                              required
                              className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors"
                              placeholder="Jane Kamau"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-[13px] font-semibold mb-2">
                              Phone (Kenya) *
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors"
                              placeholder="07XX XXX XXX"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-[13px] font-semibold mb-2">
                            Email *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors"
                            placeholder="jane@example.com"
                          />
                        </div>

                        {(inquiryType === 'hire' || inquiryType === 'other') && (
                          <div>
                            <label htmlFor="neighbourhood" className="block text-[13px] font-semibold mb-2">
                              Neighbourhood
                            </label>
                            <input
                              id="neighbourhood"
                              name="neighbourhood"
                              className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors"
                              placeholder="e.g. Kilimani, Karen, Westlands"
                            />
                          </div>
                        )}

                        {inquiryType === 'payment' && (
                          <div>
                            <label htmlFor="mpesa" className="block text-[13px] font-semibold mb-2">
                              M-Pesa confirmation code
                            </label>
                            <input
                              id="mpesa"
                              name="mpesa"
                              className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors"
                              placeholder="Paste the full M-Pesa SMS code"
                            />
                          </div>
                        )}

                        <div>
                          <label htmlFor="message" className="block text-[13px] font-semibold mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/50 focus:outline-none focus:border-brand-pink/50 transition-colors resize-none"
                            placeholder="Be specific: dates, amounts, names, and what you need us to do."
                          />
                        </div>

                        <div className="flex flex-col items-start gap-3 pt-1">
                          {error && (
                            <p className="text-[13px] text-red-600">{error}</p>
                          )}
                          <PrimaryButton
                            type="submit"
                            disabled={pending}
                            showIcon={false}
                            className="shadow-lg shadow-brand-pink/15"
                          >
                            {pending ? 'Sending…' : 'Send message'}
                          </PrimaryButton>
                        </div>
                      </form>
                  )}
                </div>
              </div>
            </SectionEntrance>
          </div>
        </div>
      </section>
    </>
  )
}

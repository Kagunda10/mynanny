'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { PrimaryButton } from '@/components/ui/primary-button'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { DoubleBevelCard } from '@/components/ui/double-bezel-card'
import type { ServiceCard, TestimonialReview } from '@/lib/cms-types'
import { DEFAULT_SERVICES, DEFAULT_TESTIMONIALS } from '@/lib/defaults'
import Image from 'next/image'

/* ─── data (fallback when CMS unavailable) ─── */

const FALLBACK_CALCULATOR = [
  { label: 'Full Day Nanny', base: 4500 },
  { label: 'Deep Cleaning', base: 6000 },
  { label: 'Elderly Care', base: 5500 },
  { label: 'Babysitting', base: 3500 },
] as const

function toCalculatorServices(services: ServiceCard[]) {
  return services.map((s) => ({
    label: s.name.replace(' Services', ''),
    base: s.basePrice,
  }))
}

function toServiceCards(services: ServiceCard[]) {
  return services.map((s) => ({
    title: s.name,
    tag: s.tag ?? 'Service',
    tagColor: s.tagColor ?? 'bg-brand-pink text-white',
    description: s.description,
    price: `KES ${s.basePrice.toLocaleString()}`,
    image: s.image ?? '',
  }))
}

function toPricingRows(services: ServiceCard[]) {
  return services.map((s) => ({
    service: s.name,
    unit: s.unit,
    rate: `KES ${s.basePrice.toLocaleString()}`,
    notes: s.description.slice(0, 80),
  }))
}

const TABS = [
  {
    label: 'Cleaning Details',
    icon: 'mop',
    content: {
      heading: "What's included in a deep clean",
      bullets: [
        'Kitchen degrease — oven, stovetop, extractor hood',
        'Bathroom tile scrub & grout whitening',
        'All glass & mirror polish',
        'Upholstery vacuum & spot treatment',
        'Balcony & veranda sweep-down',
      ],
    },
  },
  {
    label: 'Safety Protocol',
    icon: 'shield',
    content: {
      heading: "Your family's safety first",
      bullets: [
        'National police clearance certificate verified',
        'Two professional references called & confirmed',
        'Health screening: TB, Hepatitis B, HIV',
        'In-person interview & skills assessment',
        'Post-placement 30-day check-in call',
      ],
    },
  },
  {
    label: 'Price Transparency',
    icon: 'payments',
    content: {
      heading: 'No hidden fees, ever',
      bullets: [
        'One-time booking fee covers vetting & matching',
        'Daily / monthly rate paid directly to worker',
        'No long-term contracts required',
        'Free replacement within 14 days if unsatisfied',
        'Statutory deductions handled for full-time hires',
      ],
    },
  },
] as const

const FALLBACK_PRICING_ROWS = [
  { service: 'Standard Day Nanny', unit: 'Per Day', rate: 'KES 4,500', notes: 'Includes light housekeeping' },
  { service: 'Deep Cleaning 1BR', unit: 'Flat Rate', rate: 'KES 6,000', notes: 'All equipment provided' },
  { service: 'Elderly Companion', unit: 'Per Shift', rate: 'KES 5,500', notes: '12-hour coverage' },
  { service: 'Post-Construction', unit: 'Sq Ft', rate: 'KES 150', notes: 'Intensive debris removal' },
] as const

const FALLBACK_REVIEWS = [
  {
    rating: 5,
    body: '"The nanny service changed our mornings completely. Punctual, professional, and my kids adore her."',
    initials: 'AK',
    name: 'Amina K.',
    location: 'Kilimani',
    color: 'bg-primary-fixed text-primary',
  },
  {
    rating: 5,
    body: '"Deep cleaning was thorough — they even got behind the fridge! Booking was seamless via WhatsApp."',
    initials: 'JM',
    name: 'James M.',
    location: 'Westlands',
    color: 'bg-secondary-fixed text-secondary',
  },
  {
    rating: 4,
    body: "\"My mother's carer is gentle and attentive. The vetting report reassured us before day one.\"",
    initials: 'FW',
    name: 'Faith W.',
    location: 'Karen',
    color: 'bg-tertiary-fixed text-tertiary',
  },
] as const

const BEFORE_IMG = '/images/services/cleaning-before.jpg'
const AFTER_IMG = '/images/services/cleaning-after.jpg'

/* ─── animated total ─── */

function AnimatedTotal({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const display = useTransform(mv, (v) => `KES ${Math.round(v).toLocaleString()}`)

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.5, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [value, mv])

  return <motion.span>{display}</motion.span>
}

/* ─── stars ─── */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-star-amber mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined !text-[16px]"
          style={{ fontVariationSettings: i < count ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  )
}

/* ─── before / after slider ─── */

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      updatePos(e.clientX)
    },
    [updatePos],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return
      updatePos(e.clientX)
    },
    [updatePos],
  )

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setPos((p) => Math.max(0, p - 5))
    } else if (e.key === 'ArrowRight') {
      setPos((p) => Math.min(100, p + 5))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* after (full) */}
      <Image src={AFTER_IMG} alt="After cleaning" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      {/* before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={BEFORE_IMG} alt="Before cleaning" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {/* handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-on-surface text-xl leading-none focus:outline-none focus:ring-2 focus:ring-brand-pink"
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after comparison slider"
          onKeyDown={onKeyDown}
        >
          ↔
        </div>
      </div>
      {/* nudge label */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-ink/70 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-nudge pointer-events-none">
        Slide to Reveal
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

type ServicesClientProps = {
  services?: ServiceCard[]
  reviews?: TestimonialReview[]
}

export function ServicesClient({
  services = DEFAULT_SERVICES,
  reviews = DEFAULT_TESTIMONIALS,
}: ServicesClientProps) {
  const calculatorServices =
    services.length > 0 ? toCalculatorServices(services) : [...FALLBACK_CALCULATOR]
  const serviceCards = services.length > 0 ? toServiceCards(services) : toServiceCards(DEFAULT_SERVICES)
  const pricingRows = services.length > 0 ? toPricingRows(services) : [...FALLBACK_PRICING_ROWS]

  const [serviceIdx, setServiceIdx] = useState(0)
  const [frequency, setFrequency] = useState(1)
  const [activeTab, setActiveTab] = useState(0)

  const total = (calculatorServices[serviceIdx]?.base ?? 0) * frequency

  return (
    <div>
      {/* ── 1. Hero ── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <EyebrowPill icon="home" text="Our Services" />

            <h1 className="text-[36px] md:text-[48px] font-semibold leading-[1.1] tracking-tight mt-6 mb-6">
              Professional home help,{' '}
              <span className="text-brand-pink">tailored</span> to your
              family.
            </h1>

            <p className="text-lg leading-relaxed text-on-surface-variant max-w-lg mb-8">
              From daily childcare to deep-cleaning blitzes, our vetted professionals deliver reliable,
              high-quality domestic services across Nairobi.
            </p>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="#pricing-calculator" icon="calculate">
                Estimate Cost
              </PrimaryButton>
              <PrimaryButton variant="secondary" href="#service-cards">
                Browse Services
              </PrimaryButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="double-bezel max-w-[420px] mx-auto">
              <div className="double-bezel-inner !p-0 overflow-hidden relative aspect-[4/5] w-full">
                <Image
                  className="object-cover"
                  src={serviceCards[0]?.image ?? ''}
                  alt="Professional nanny caring for a child"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority
                />
              </div>
            </div>
            {/* verified badge overlay */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 double-bezel">
              <div className="double-bezel-inner !py-2 !px-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-verified-green !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="text-sm font-bold whitespace-nowrap">All Workers Verified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Pricing Calculator (Dark Slab) ── */}
      <section id="pricing-calculator" className="floating-slab py-16 md:py-24 my-8">
        <div className="max-w-[1280px] mx-auto px-5 md:px-6">
          <SectionEntrance>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* left */}
              <div className="text-white">
                <EyebrowPill icon="calculate" text="Pricing Calculator" color="secondary" />

                <h2 className="text-[32px] md:text-[40px] font-semibold leading-[1.15] tracking-tight mt-6 mb-4">
                  Estimate your service cost{' '}
                  <span className="text-secondary-fixed">instantly.</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-md mb-10">
                  Choose a service type and how many days you need. Your total updates in real time — no sign-up
                  required.
                </p>

                {/* service select */}
                <label className="block mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">
                    Service Type
                  </span>
                  <div className="relative">
                    <select
                      value={serviceIdx}
                      onChange={(e) => setServiceIdx(Number(e.target.value))}
                      className="w-full appearance-none bg-white/5 backdrop-blur border border-white/10 rounded-xl px-5 py-3.5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-secondary-fixed/50 cursor-pointer"
                    >
                      {calculatorServices.map((s, i) => (
                        <option key={s.label} value={i} className="bg-dark-ink text-white">
                          {s.label} — KES {s.base.toLocaleString()}/day
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </label>

                {/* frequency slider */}
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2 block">
                    Frequency — {frequency} {frequency === 1 ? 'day' : 'days'} per week
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={7}
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full accent-brand-pink h-2 rounded-full appearance-none bg-white/10 cursor-pointer"
                  />
                  <div className="flex justify-between text-white/30 text-xs mt-1">
                    <span>1 day</span>
                    <span>7 days</span>
                  </div>
                </label>
              </div>

              {/* right — total display */}
              <div className="flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-10 md:p-14 text-center w-full max-w-sm">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-4">
                    Estimated Weekly Total
                  </span>
                  <div className="text-[48px] md:text-[56px] font-semibold text-white leading-none mb-3">
                    <AnimatedTotal value={total} />
                  </div>
                  <p className="text-white/40 text-sm mb-8">
                    *Pricing may vary based on specific home size and requirements
                  </p>
                  <PrimaryButton href="/#match-form" icon="arrow_forward">
                    Book Now
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </SectionEntrance>
        </div>
      </section>

      {/* ── 3. Service Cards Grid ── */}
      <section id="service-cards" className="max-w-[1280px] mx-auto px-5 md:px-6 py-20">
        <SectionEntrance>
          <div className="text-center mb-14">
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight">
              Services built for Nairobi families
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-xl mx-auto text-lg">
              Each service includes our full vetting pipeline — so you never have to worry.
            </p>
          </div>
        </SectionEntrance>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((card, i) => (
            <SectionEntrance key={card.title} delay={i * 0.1}>
              <DoubleBevelCard innerClassName="!p-0 overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3] w-full">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>
                  <span
                    className={`absolute top-4 left-4 ${card.tagColor} text-xs font-bold px-3 py-1 rounded-full`}
                  >
                    {card.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-5">{card.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-primary-fixed text-primary text-xs font-bold px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined !text-[14px]">payments</span>
                      {card.price}/day
                    </span>
                    <span className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-brand-pink hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </DoubleBevelCard>
            </SectionEntrance>
          ))}
        </div>
      </section>

      {/* ── 4. Before / After + Tabs ── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-20">
        <SectionEntrance>
          <div className="bg-surface-container rounded-[32px] p-6 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* left — tabs */}
              <div>
                <h2 className="text-[28px] md:text-[32px] font-semibold leading-[1.2] tracking-tight mb-8">
                  See what you get
                </h2>

                <div className="flex gap-6 mb-8 overflow-x-auto border-b border-outline-variant/30">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={`relative flex items-center gap-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                        activeTab === i
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined !text-[18px]">{tab.icon}</span>
                      {tab.label}
                      {activeTab === i && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-lg font-semibold mb-4">{TABS[activeTab].content.heading}</h3>
                  <ul className="space-y-3">
                    {TABS[activeTab].content.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-on-surface-variant">
                        <span
                          className="material-symbols-outlined !text-[18px] text-verified-green mt-0.5"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* right — before/after */}
              <BeforeAfterSlider />
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* ── 5. Pricing Table ── */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <SectionEntrance>
          <div className="text-center mb-12">
            <EyebrowPill icon="receipt_long" text="Rate Card" />
            <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight mt-4">
              Transparent pricing
            </h2>
            <p className="text-on-surface-variant mt-3 text-lg">No hidden charges. What you see is what you pay.</p>
          </div>

          <div className="double-bezel">
            <div className="double-bezel-inner !p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[520px]">
                  <thead className="bg-surface-container-high border-b border-outline-variant/30">
                    <tr>
                      <th className="p-5 font-bold text-[13px] uppercase tracking-wider">Service Item</th>
                      <th className="p-5 font-bold text-[13px] uppercase tracking-wider">Unit</th>
                      <th className="p-5 font-bold text-[13px] uppercase tracking-wider">Base Rate</th>
                      <th className="p-5 font-bold text-[13px] uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {pricingRows.map((row) => (
                      <tr key={row.service} className="hover:bg-surface-container-low transition-colors">
                        <td className="p-5 font-medium">{row.service}</td>
                        <td className="p-5 text-on-surface-variant">{row.unit}</td>
                        <td className="p-5 text-primary font-semibold">{row.rate}</td>
                        <td className="p-5 text-on-surface-variant text-sm">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* ── 6. Reviews ── */}
      <section className="px-5 md:px-6 max-w-[1280px] mx-auto py-12">
        <div className="bg-white rounded-[40px] py-16 px-5 md:px-12">
          <SectionEntrance>
            <div className="text-center mb-14">
              <EyebrowPill icon="reviews" text="Client Reviews" />
              <h2 className="text-[32px] font-semibold leading-[1.2] tracking-tight mt-4">
                Trusted by families across Nairobi
              </h2>
            </div>
          </SectionEntrance>

          <SectionEntrance delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.name}
                  className="double-bezel cursor-default"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="double-bezel-inner">
                    <Stars count={review.rating} />
                    <p className="italic mb-6 text-[15px] leading-relaxed">{review.body}</p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center font-bold text-sm`}
                      >
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold">{review.name}</p>
                        <p className="text-[12px] text-on-surface-variant">{review.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionEntrance>
        </div>
      </section>
    </div>
  )
}

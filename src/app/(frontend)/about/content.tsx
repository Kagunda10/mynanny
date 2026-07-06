'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { CountUp } from '@/components/motion/count-up'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { PrimaryButton } from '@/components/ui/primary-button'
import { COMPANY } from '@/lib/site-content'
import type { AboutContent, TeamMember, TimelineItem } from '@/lib/cms-types'
import { DEFAULT_ABOUT, DEFAULT_TIMELINE } from '@/lib/extended-defaults'
import Image from 'next/image'

const STAT_COLORS = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
} as const

type AboutContentProps = {
  about?: AboutContent
  timeline?: TimelineItem[]
  team?: TeamMember[]
}

export function AboutContent({
  about = DEFAULT_ABOUT,
  timeline = DEFAULT_TIMELINE,
  team = [{ name: 'Alexander', role: 'Co-Founder' }, { name: 'James', role: 'Co-Founder' }],
}: AboutContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const heroParts = about.heroTitle.split('trust')

  const founders = team.filter(
    (member, index, arr) => arr.findIndex((m) => m.name === member.name) === index,
  )

  return (
    <>
      <section className="relative min-h-[600px] flex items-end pt-32 pb-16 px-5 md:px-6">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${about.heroImage}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        </div>
        <motion.div
          className="relative z-10 max-w-[1280px] mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <EyebrowPill icon="groups" text="Our story" />
          <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
            {heroParts.length > 1 ? (
              <>
                {heroParts[0]}
                <span className="text-brand-pink">trust</span>
                {heroParts.slice(1).join('trust')}
              </>
            ) : (
              about.heroTitle
            )}
          </h1>
        </motion.div>
      </section>

      <section className="py-12 px-5 md:px-6 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 md:sticky md:top-32 h-fit">
            <span className="text-[96px] md:text-[120px] font-bold leading-none text-primary/10 select-none font-display">
              2019
            </span>
            <h2 className="text-[32px] font-semibold -mt-12 md:-mt-16 text-primary">The Origin.</h2>
          </div>
          <div className="md:w-2/3 space-y-8">
            <p className="text-[18px] text-on-surface-variant leading-relaxed">{about.originStory}</p>
            <p className="text-[18px] text-on-surface-variant leading-relaxed">{about.bodyStory}</p>
            <SectionEntrance>
              <div className="w-full aspect-video rounded-[40px] overflow-hidden shadow-lg">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${about.storyImage}')` }} />
              </div>
            </SectionEntrance>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-6 py-12 max-w-[1280px] mx-auto">
        <SectionEntrance>
          <div className="bg-inverse-surface rounded-[40px] p-12 md:p-16 text-center">
            <div className="max-w-4xl mx-auto">
              <span className="material-symbols-outlined text-primary-fixed text-6xl mb-8 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                format_quote
              </span>
              <blockquote className="text-[24px] md:text-[32px] font-semibold text-inverse-on-surface leading-tight italic">
                &ldquo;{about.mission}&rdquo;
              </blockquote>
              <div className="mt-8 flex justify-center items-center gap-4">
                <div className="h-px w-12 bg-primary-fixed" />
                <p className="text-primary-fixed text-[14px] font-semibold uppercase tracking-widest">Our Mission</p>
                <div className="h-px w-12 bg-primary-fixed" />
              </div>
              <p className="mt-8 text-inverse-on-surface/60 text-[16px] max-w-2xl mx-auto leading-relaxed">
                <span className="text-primary-fixed font-semibold">Vision:</span> {about.vision}
              </p>
            </div>
          </div>
        </SectionEntrance>
      </section>

      <section className="py-12 overflow-hidden max-w-[1280px] mx-auto relative">
        <div className="px-5 md:px-6 mb-12 flex justify-between items-center">
          <h2 className="text-[32px] font-semibold">Our Journey</h2>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex overflow-x-auto gap-6 px-5 md:px-6 pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        >
          {timeline.map((item) => (
            <div key={item.year + item.title} className="snap-start min-w-[320px] md:min-w-[400px]">
              <div className="double-bezel h-full">
                <div className="double-bezel-inner double-bezel-lift flex flex-col justify-between h-full">
                  <div>
                    <span className="text-primary font-bold text-[24px] block mb-2">{item.year}</span>
                    <h4 className="text-[24px] font-medium mb-4">{item.title}</h4>
                    <p className="text-on-surface-variant">{item.description}</p>
                  </div>
                  {item.image && (
                    <div className="mt-8 h-48 rounded-xl overflow-hidden relative">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 px-5 md:px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] font-semibold mb-4">What Guides Us</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Our values aren&apos;t just words on a wall; they are the filters for every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {about.values.map((value, i) => (
              <SectionEntrance key={value.title} delay={i * 0.1}>
                <div className="double-bezel h-full">
                  <div className="double-bezel-inner double-bezel-lift !p-8 md:!p-10 h-full">
                    <div className="bg-chip-bg w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <span
                        className="material-symbols-outlined text-primary text-[22px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                    <h4 className="text-[24px] font-medium mb-3">{value.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </SectionEntrance>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 md:px-6 max-w-[1280px] mx-auto">
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-[40px] py-12 px-5 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {about.impactStats.map((stat, i) => (
            <SectionEntrance key={stat.label} delay={i * 0.1}>
              <div>
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  className={`text-[64px] font-bold ${STAT_COLORS[stat.color]} block leading-none mb-2 font-display`}
                />
                <p className="text-[14px] font-semibold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
              </div>
            </SectionEntrance>
          ))}
        </div>
      </section>

      <section className="py-12 px-5 md:px-6 max-w-[1280px] mx-auto">
        <h2 className="text-[32px] font-semibold mb-4">The Co-Founders</h2>
        <p className="text-on-surface-variant mb-12 max-w-xl">
          Friends who saw the same gap in Nairobi&apos;s domestic help market and built Mynanny to close it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {founders.map((member) => (
            <SectionEntrance key={member.id ?? member.name}>
              <div className="double-bezel h-full">
                <div className="double-bezel-inner double-bezel-lift h-full">
                  {member.image ? (
                    <div className="w-20 h-20 rounded-full mb-6 relative overflow-hidden">
                      <Image src={member.image} alt={member.name} fill className="object-cover" sizes="80px" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <span className="text-[28px] font-bold text-primary">{member.name[0]}</span>
                    </div>
                  )}
                  <h4 className="text-[24px] font-medium">{member.name}</h4>
                  <p className="text-primary text-[14px] font-semibold mb-4">{member.role}</p>
                  <p className="text-on-surface-variant leading-relaxed">
                    {member.bio ??
                      `Co-founded MyNanny in ${COMPANY.founded} to connect Nairobi families with vetted domestic professionals.`}
                  </p>
                </div>
              </div>
            </SectionEntrance>
          ))}
        </div>
      </section>

      <section className="py-12 px-5 md:px-6 max-w-[1280px] mx-auto mb-20">
        <SectionEntrance>
          <div className="relative rounded-[40px] overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-primary/90" />
            <div className="relative z-10">
              <h2 className="text-[36px] md:text-[48px] font-semibold text-white mb-8">{about.ctaTitle}</h2>
              <p className="text-primary-fixed-dim text-[18px] mb-12 max-w-2xl mx-auto">{about.ctaDescription}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <PrimaryButton href="/#match-form">Find a Nanny</PrimaryButton>
                <PrimaryButton
                  href="/join"
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Join Our Team
                </PrimaryButton>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>
    </>
  )
}

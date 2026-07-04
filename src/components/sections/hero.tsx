'use client'

import { motion } from 'motion/react'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { PrimaryButton } from '@/components/ui/primary-button'
import { CountUp } from '@/components/motion/count-up'
import { ParallaxBlob } from '@/components/motion/parallax-blob'
import type { HomepageContent } from '@/lib/cms-types'
import { DEFAULT_HOMEPAGE } from '@/lib/defaults'

const TRUST_CHIPS = [
  {
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRXwl4L_-M5RBUNuH30REAfqBK6hfqdQKcSPvQvIlb5IO65w2VDBETwFT-CtoARPpvUmi7AAyJVO_B484KfdS1MXb0obPg-sAM1c42UA2cqilJd6j44Q2Kf66qWxI15QmyYcT-fZ7jqiZhEdmECi-hltQPl2JHHz3U4LC5UYFCb-YcGDJ_9tyoNzeQfa9LYkFdFbSAZSWhMpJiyBOKXj4l_IS6bNq0VHlRt1EqNujLnH_jYy8gmG3bvQ',
    title: 'Mary W.',
    subtitle: 'Nanny · 5 stars',
    subtitleClass: 'text-primary',
  },
  {
    icon: 'security',
    title: 'Police Clearance',
    subtitle: 'Verified Oct 2024',
    subtitleClass: 'text-on-surface-variant',
  },
] as const

function TrustChip({ chip }: { chip: (typeof TRUST_CHIPS)[number] }) {
  return (
    <div className="double-bezel">
      <div className="double-bezel-inner !p-3 flex items-center gap-3">
        {'avatar' in chip ? (
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
            <img className="w-full h-full object-cover" src={chip.avatar} alt={chip.title} />
          </div>
        ) : (
          <span className="material-symbols-outlined text-verified-green bg-green-50 p-2 rounded-full shrink-0">
            {chip.icon}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-[14px] font-bold truncate">{chip.title}</p>
          <p className={`text-[12px] truncate ${chip.subtitleClass}`}>{chip.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

type HeroProps = {
  content?: HomepageContent
}

export function Hero({ content = DEFAULT_HOMEPAGE }: HeroProps) {
  const words = content.heroHeadline.trim().split(/\s+/)
  const firstWord = words[0] ?? ''
  const restOfHeadline = words.slice(1).join(' ')

  return (
    <section className="relative max-w-[1280px] mx-auto px-5 md:px-6 py-12 flex flex-col md:grid md:grid-cols-12 gap-12 items-center min-h-[calc(100dvh-120px)] overflow-x-hidden">
      <motion.div
        className="md:col-span-7 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <EyebrowPill icon="verified" text={content.heroEyebrow} />

        <h1 className="text-[36px] md:text-[48px] font-semibold leading-[1.1] tracking-tight mt-6 mb-6">
          <span className="text-brand-pink">{firstWord}</span>
          {restOfHeadline ? ` ${restOfHeadline}` : ''}
        </h1>

        <p className="text-[18px] leading-relaxed text-on-surface-variant max-w-lg mb-8">
          {content.heroSubheadline}
        </p>

        <div className="flex flex-wrap gap-6 mb-12">
          {content.stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="w-px h-12 bg-outline-variant/30 hidden sm:block" />}
              <div className="flex flex-col">
                {stat.numericTarget && stat.label !== 'User Rating' ? (
                  <CountUp
                    target={stat.numericTarget}
                    suffix={stat.suffix}
                    className="text-[32px] font-semibold text-primary"
                  />
                ) : (
                  <span className="text-[32px] font-semibold text-primary flex items-center gap-2">
                    {stat.value}
                    {stat.label === 'User Rating' && (
                      <span
                        className="material-symbols-outlined text-star-amber !text-[24px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    )}
                  </span>
                )}
                <span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <PrimaryButton href={content.heroCtaUrl}>{content.heroCtaText}</PrimaryButton>
          <PrimaryButton href="/pricing" variant="secondary">
            View Pricing
          </PrimaryButton>
        </div>

        <div className="flex flex-wrap items-center gap-8 opacity-40 grayscale contrast-125">
          <span className="font-bold text-lg">Business Daily</span>
          <span className="font-bold text-lg">TechCabal</span>
          <span className="font-bold text-lg">Nation</span>
          <span className="font-bold text-lg">Capital FM</span>
        </div>
      </motion.div>

      <motion.div
        className="md:col-span-5 relative w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full max-w-[400px] mx-auto aspect-[4/5]">
          <div className="absolute inset-0 bg-dark-ink rounded-[40px] shadow-2xl p-3">
            <div className="bg-white h-full w-full rounded-[30px] overflow-hidden relative">
              <img
                className="w-full h-full object-cover"
                src={content.heroImage}
                alt="MyNanny mobile app showing a verified nanny profile"
              />
            </div>
          </div>

          <ParallaxBlob className="absolute -left-12 top-1/4 z-10 hidden md:block" duration={4} distance={8}>
            <div className="double-bezel w-48">
              <div className="double-bezel-inner !p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={TRUST_CHIPS[0].avatar}
                    alt="Mary W. - rated nanny"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-bold">Mary W.</p>
                  <p className="text-[12px] text-primary">Nanny · 5 stars</p>
                </div>
              </div>
            </div>
          </ParallaxBlob>

          <ParallaxBlob className="absolute -right-8 bottom-1/4 z-10 hidden md:block" duration={5} distance={6}>
            <div className="double-bezel w-52">
              <div className="double-bezel-inner !p-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-verified-green bg-green-50 p-2 rounded-full">
                  security
                </span>
                <div>
                  <p className="text-[14px] font-bold">Police Clearance</p>
                  <p className="text-[12px] text-on-surface-variant">Verified Oct 2024</p>
                </div>
              </div>
            </div>
          </ParallaxBlob>
        </div>

        <div className="md:hidden mt-6 grid grid-cols-1 gap-3 max-w-[400px] mx-auto">
          {TRUST_CHIPS.map((chip) => (
            <TrustChip key={chip.title} chip={chip} />
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
        <div className="w-6 h-10 border-2 border-on-surface-variant/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

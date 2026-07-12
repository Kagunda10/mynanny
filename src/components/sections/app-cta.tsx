'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { BrandLogo } from '@/components/brand-logo'
import type { MarketingContent } from '@/lib/cms-types'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'
import Image from 'next/image'

type AppCTAProps = {
  content?: MarketingContent['appCta']
}

function StoreBadges({
  appStoreUrl,
  playStoreUrl,
}: {
  appStoreUrl?: string
  playStoreUrl?: string
}) {
  const appStoreBadge = (
    <Image
      src="/badges/app-store.svg"
      alt="Download on the App Store"
      width={120}
      height={40}
      className="h-10 w-auto"
      unoptimized
    />
  )

  const playStoreBadge = (
    <Image
      src="/badges/google-play.png"
      alt="Get it on Google Play"
      width={135}
      height={52}
      className="h-[52px] w-auto"
      unoptimized
    />
  )

  return (
    <div className="flex flex-wrap items-center gap-3">
      {appStoreUrl ? (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex transition-opacity hover:opacity-90"
        >
          {appStoreBadge}
        </a>
      ) : (
        <span className="inline-flex opacity-80">{appStoreBadge}</span>
      )}
      {playStoreUrl ? (
        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex -ml-1 transition-opacity hover:opacity-90"
        >
          {playStoreBadge}
        </a>
      ) : (
        <span className="inline-flex -ml-1 opacity-80">{playStoreBadge}</span>
      )}
    </div>
  )
}

export function AppCTA({ content = DEFAULT_MARKETING.appCta }: AppCTAProps) {
  return (
    <section className="floating-slab mb-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 grid md:grid-cols-2 items-center">
        <SectionEntrance className="py-20">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-semibold text-white leading-[1.1] mb-6">{content.title}</h2>
            <p className="text-white/80 mb-10 text-[18px]">{content.description}</p>
            <StoreBadges appStoreUrl={content.appStoreUrl} playStoreUrl={content.playStoreUrl} />
          </div>
        </SectionEntrance>

        <div className="relative h-full hidden md:flex items-end justify-center group">
          <div className="w-64 h-[500px] bg-white rounded-t-[40px] plum-shadow p-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-700 flex flex-col">
            <div className="flex items-center gap-2 px-2 py-3 shrink-0">
              <BrandLogo variant="app-icon" className="h-8 w-8 rounded-xl" />
              <span className="text-[13px] font-bold text-on-surface">Mynanny</span>
            </div>
            <div className="relative w-full flex-1 rounded-t-[30px] overflow-hidden">
              <Image className="object-cover" src={content.image} alt="Mynanny app dashboard" fill sizes="256px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

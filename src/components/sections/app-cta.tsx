'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { BrandLogo } from '@/components/brand-logo'
import type { MarketingContent } from '@/lib/cms-types'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'

type AppCTAProps = {
  content?: MarketingContent['appCta']
}

export function AppCTA({ content = DEFAULT_MARKETING.appCta }: AppCTAProps) {
  return (
    <section className="floating-slab mb-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 grid md:grid-cols-2 items-center">
        <SectionEntrance className="py-20">
          <div>
            <h2 className="text-[36px] md:text-[48px] font-semibold text-white leading-[1.1] mb-6">{content.title}</h2>
            <p className="text-white/80 mb-10 text-[18px]">{content.description}</p>
            <div className="flex flex-wrap gap-4">
              {content.appStoreUrl ? (
                <a
                  href={content.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit max-w-full items-center gap-3 bg-white text-dark-ink px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors"
                >
                  <span className="material-symbols-outlined !text-[24px]">apps</span> App Store
                </a>
              ) : (
                <button className="inline-flex w-fit max-w-full items-center gap-3 bg-white text-dark-ink px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors">
                  <span className="material-symbols-outlined !text-[24px]">apps</span> App Store
                </button>
              )}
              {content.playStoreUrl ? (
                <a
                  href={content.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit max-w-full items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  <span className="material-symbols-outlined !text-[24px]">play_arrow</span> Google Play
                </a>
              ) : (
                <button className="inline-flex w-fit max-w-full items-center gap-3 bg-white/10 text-white border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined !text-[24px]">play_arrow</span> Google Play
                </button>
              )}
            </div>
          </div>
        </SectionEntrance>

        <div className="relative h-full hidden md:flex items-end justify-center group">
          <div className="w-64 h-[500px] bg-white rounded-t-[40px] plum-shadow p-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-700 flex flex-col">
            <div className="flex items-center gap-2 px-2 py-3 shrink-0">
              <BrandLogo variant="app-icon" className="h-8 w-8 rounded-xl" />
              <span className="text-[13px] font-bold text-on-surface">MyNanny</span>
            </div>
            <img className="w-full flex-1 object-cover rounded-t-[30px]" src={content.image} alt="MyNanny app dashboard" />
          </div>
        </div>
      </div>
    </section>
  )
}

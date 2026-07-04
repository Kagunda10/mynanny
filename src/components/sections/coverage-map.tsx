'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { SectionHeader } from '@/components/ui/section-header'
import { CountUp } from '@/components/motion/count-up'
import type { CoverageContent } from '@/lib/cms-types'
import { DEFAULT_COVERAGE } from '@/lib/defaults'
import { cn } from '@/lib/utils'

const CoverageLeafletMap = dynamic(
  () => import('@/components/sections/coverage-leaflet-map').then((m) => m.CoverageLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-surface-container-high/60 rounded-[18px]" />
    ),
  },
)

type Hood = CoverageContent['neighborhoods'][number]

function defaultHood(neighborhoods: Hood[]) {
  return neighborhoods.reduce((best, hood) => (hood.workers > best.workers ? hood : best))
}

type CoverageMapProps = {
  content?: CoverageContent
}

export function CoverageMap({ content = DEFAULT_COVERAGE }: CoverageMapProps) {
  const reduce = useReducedMotion()
  const { location, section, neighborhoods, totalWorkers, avgMatchHours } = content

  const initial = useMemo(() => defaultHood(neighborhoods), [neighborhoods])
  const topDensity = useMemo(
    () => new Set([...neighborhoods].sort((a, b) => b.workers - a.workers).slice(0, 3).map((n) => n.name)),
    [neighborhoods],
  )

  const [selected, setSelected] = useState(initial.name)
  const [hovered, setHovered] = useState<string | null>(null)

  const selectedHood = neighborhoods.find((n) => n.name === selected) ?? initial
  const focusName = hovered ?? selected
  const focusHood = neighborhoods.find((n) => n.name === focusName) ?? selectedHood
  const workerStatLabel = `In ${focusHood.name}`

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionEntrance>
            <div className="double-bezel">
              <div className="double-bezel-inner !p-0 overflow-hidden">
                <div className="relative w-full aspect-square bg-surface-container-low rounded-[18px] overflow-hidden">
                  <CoverageLeafletMap
                    location={location}
                    neighborhoods={neighborhoods}
                    selected={selected}
                    focusName={focusName}
                    topDensity={topDensity}
                    reduceMotion={!!reduce}
                    onSelect={setSelected}
                    onHover={setHovered}
                  />

                  <div className="pointer-events-none absolute top-4 left-5 z-[500] rounded-full bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                      {location.regionLabel}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[500] bg-gradient-to-t from-white/95 via-white/75 to-transparent px-5 pb-4 pt-14">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-pink" />
                        <span className="text-[11px] text-on-surface-variant">Active workers</span>
                      </div>
                      <span className="text-[11px] font-bold text-on-surface">
                        {neighborhoods.length} neighborhoods
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory px-4 py-3 -mx-1 scrollbar-none">
                  {neighborhoods.map((hood) => (
                    <button
                      key={hood.name}
                      type="button"
                      onClick={() => setSelected(hood.name)}
                      className={cn(
                        'shrink-0 snap-start rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors',
                        selected === hood.name
                          ? 'bg-brand-pink text-white shadow-sm'
                          : 'bg-surface-container-high text-on-surface-variant',
                      )}
                    >
                      {hood.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionEntrance>

          <SectionEntrance delay={0.1}>
            <SectionHeader
              eyebrow={<EyebrowPill icon="location_on" text={section.eyebrow} />}
              title={section.title}
              subtitle={section.subtitle}
              centered={false}
              className="mb-0"
              subtitleClassName="max-w-lg text-[16px]"
            />

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-surface-container-low rounded-2xl">
                <CountUp
                  key={`workers-${focusHood.name}`}
                  target={focusHood.workers}
                  className="text-[28px] font-bold text-brand-pink block"
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={workerStatLabel}
                    className="text-[12px] text-on-surface-variant mt-1"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {workerStatLabel}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="text-center p-4 bg-surface-container-low rounded-2xl">
                <CountUp target={neighborhoods.length} className="text-[28px] font-bold text-secondary block" />
                <p className="text-[12px] text-on-surface-variant mt-1">Neighborhoods</p>
              </div>
              <div className="text-center p-4 bg-surface-container-low rounded-2xl">
                <CountUp target={avgMatchHours} suffix="h" className="text-[28px] font-bold text-on-surface block" />
                <p className="text-[12px] text-on-surface-variant mt-1">Avg match time</p>
              </div>
            </div>

            <motion.div
              key={selectedHood.name}
              className="mt-6 p-5 bg-white border border-outline-variant/30 rounded-[18px] shadow-sm"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[16px] font-bold text-on-surface">{selectedHood.name}</h3>
                <span className="text-[13px] text-brand-pink font-semibold">{selectedHood.workers} workers</span>
              </div>
              <p className="text-[13px] text-on-surface-variant mb-3">
                Popular roles in this area — tap another pin or pill to compare neighborhoods.
              </p>
              <div className="flex gap-2 flex-wrap">
                {selectedHood.popular.map((service) => (
                  <span
                    key={service}
                    className="text-[11px] bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface-variant"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>

            <p className="mt-4 text-[12px] text-on-surface-variant/70">
              <span className="font-semibold text-on-surface">{totalWorkers.toLocaleString()}+</span> workers
              citywide across all {neighborhoods.length} neighborhoods.
            </p>
          </SectionEntrance>
        </div>
      </div>
    </section>
  )
}

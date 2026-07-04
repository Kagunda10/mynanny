import { DEFAULT_HOMEPAGE } from '@/lib/defaults'

type MarqueeProps = {
  neighborhoods?: string[]
  services?: string[]
}

export function Marquee({
  neighborhoods = DEFAULT_HOMEPAGE.marqueeNeighborhoods,
  services = DEFAULT_HOMEPAGE.marqueeServices,
}: MarqueeProps) {
  return (
    <section className="py-12 bg-surface-container-low overflow-hidden">
      <div className="overflow-hidden whitespace-nowrap mb-4">
        <div className="inline-flex animate-[marquee_40s_linear_infinite] gap-12 px-6">
          {[...neighborhoods, ...neighborhoods].map((n, i) => (
            <span key={i} className="text-[32px] font-semibold text-on-surface-variant/20 italic">
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-[marquee-reverse_40s_linear_infinite] gap-12 px-6">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="text-[24px] font-medium text-primary flex items-center gap-2">
              {s}
              <span className="w-2 h-2 rounded-full bg-primary/30" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

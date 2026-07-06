'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import Image from 'next/image'

export function VideoTestimonial() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group cursor-pointer">
          <div className="double-bezel">
            <div className="double-bezel-inner !p-0 overflow-hidden relative aspect-video w-full">
              <Image
                className="object-cover"
                src="/images/testimonials/family-video-thumb.jpg"
                alt="Happy family in Nairobi suburb"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined text-primary !text-[48px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionEntrance delay={0.2}>
          <div>
            <span
              className="material-symbols-outlined text-primary !text-[64px] mb-6"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p className="text-[32px] font-semibold mb-8 leading-tight">
              &ldquo;We interviewed three candidates in one weekend and hired on Monday. The quality is unmatched.&rdquo;
            </p>
            <p className="font-bold text-lg">The Omari Family</p>
            <p className="text-on-surface-variant">Homeowners, Rosslyn Heights</p>
          </div>
        </SectionEntrance>
      </div>
    </section>
  )
}

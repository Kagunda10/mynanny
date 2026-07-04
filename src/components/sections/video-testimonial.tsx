'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'

export function VideoTestimonial() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group cursor-pointer">
          <div className="double-bezel">
            <div className="double-bezel-inner !p-0 overflow-hidden relative aspect-video">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNaojyBXRPSkFohy4uS1S3AxQc3R9o66WQgiWwW53SA_22Su0MreWYPGc1eKMOINU2fIivnmEurUHyfRiGkqO7O0wTte9WgkjpZDfPmMyTdG6sPjfvtMyTmNyqOZaMyXBc2xyT4kWvraWb68P4WFRECg_o7BrEff2I8KWLTjgtc8DSyZomrFhU1Dybczkye73pVyW8J4lQHE7CvXOOUoNi8Y735sgjTZWEkE8NtcwLwn9CaETcQCRs2A"
                alt="Happy family in Nairobi suburb"
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

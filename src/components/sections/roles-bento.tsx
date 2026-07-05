'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { SectionHeader } from '@/components/ui/section-header'

export function RolesBento() {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-12">
      <SectionHeader title="Specialized services for every home" />

      <SectionEntrance>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[600px]">
          {/* Large nanny card */}
          <div className="md:col-span-2 md:row-span-2 double-bezel group cursor-pointer overflow-hidden">
            <div className="double-bezel-inner !p-0 h-full relative overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFe3rh_pU0nv7s-uAD2YpkddwFVlHEIANf6jLrS8wZ14TZ64zLzO3ORR4zR0-1bFtadTXAf2FbECHlCOFPkda3nM921GoK54UN4AJkRKt4Ng5i2BxoB3lhjQ3frmjmAs9Z7I14MqU9bzgDBkh-jbxBkuuNuIBJVQ49N-fxZnSqepHfaUaEyj-QQPATOb5eRLIviG7tHBK0GV4SwdWu8OUnlPw5AU0r5BBcEYru7WU0cLe86HnA1Ry8Gw"
                alt="Professional nanny reading to children"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white text-[32px] font-semibold">Nannies</h3>
                <p className="text-white/80">Verified, background-checked, and child-safety trained professionals.</p>
              </div>
            </div>
          </div>

          {/* Deep Cleaning */}
          <div className="md:col-span-2 double-bezel group cursor-pointer">
            <div className="double-bezel-inner h-full bg-secondary-container/20 flex flex-col justify-between">
              <div>
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-[12px] font-bold mb-4 inline-block">
                  MOST POPULAR
                </span>
                <h3 className="text-[24px] font-medium text-secondary">Deep Cleaning</h3>
                <p className="text-on-surface-variant mt-2">Comprehensive 48-point checklist for a spotless home.</p>
              </div>
              <div className="flex justify-end">
                <span className="material-symbols-outlined text-secondary !text-[48px]">sanitizer</span>
              </div>
            </div>
          </div>

          {/* Elderly Care */}
          <div className="double-bezel group cursor-pointer">
            <div className="double-bezel-inner h-full bg-tertiary-fixed/20 flex flex-col justify-between">
              <h3 className="text-[24px] font-medium text-tertiary">Elderly Care</h3>
              <p className="text-on-surface-variant text-[12px]">Compassionate assistance for your seniors.</p>
              <div className="mt-4">
                <span className="material-symbols-outlined text-tertiary !text-[32px]">elderly</span>
              </div>
            </div>
          </div>

          {/* Laundry */}
          <div className="double-bezel group cursor-pointer">
            <div className="double-bezel-inner h-full bg-surface-container-highest flex flex-col justify-between">
              <h3 className="text-[24px] font-medium text-on-surface">Laundry</h3>
              <p className="text-on-surface-variant text-[12px]">Wash, dry, and professional ironing.</p>
              <div className="mt-4">
                <span className="material-symbols-outlined text-on-surface !text-[32px]">local_laundry_service</span>
              </div>
            </div>
          </div>
        </div>
      </SectionEntrance>
    </section>
  )
}

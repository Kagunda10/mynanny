'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'

const ROLES = [
  { label: 'Live-in Nanny', baseMin: 18000, baseMax: 35000, growth: 2500 },
  { label: 'Day Nanny', baseMin: 12000, baseMax: 25000, growth: 2000 },
  { label: 'Housekeeper', baseMin: 10000, baseMax: 20000, growth: 1500 },
  { label: 'Caregiver', baseMin: 20000, baseMax: 40000, growth: 3000 },
  { label: 'Gardener', baseMin: 8000, baseMax: 15000, growth: 1200 },
]

export function EarningsCalculator() {
  const [selectedRole, setSelectedRole] = useState(0)
  const [experience, setExperience] = useState(2)
  const reduce = useReducedMotion()

  const role = ROLES[selectedRole]
  const estimated = useMemo(() => {
    const base = role.baseMin + (role.baseMax - role.baseMin) * 0.3
    const expBonus = Math.min(experience, 8) * role.growth * 0.12
    return Math.round((base + expBonus) / 100) * 100
  }, [selectedRole, experience, role])

  const bureauTake = Math.round(estimated * 0.6)
  const mynannyTake = Math.round(estimated * 0.92)
  const difference = mynannyTake - bureauTake

  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-16 md:py-24">
      <SectionEntrance>
        <div className="double-bezel max-w-3xl mx-auto">
          <div className="double-bezel-inner">
            <div className="text-center mb-8">
              <h2 className="text-[24px] md:text-[32px] font-semibold text-on-surface mb-2">
                Calculate your earnings.
              </h2>
              <p className="text-on-surface-variant text-[14px]">
                See what you could take home with Mynanny vs. a traditional bureau.
              </p>
            </div>

            {/* Role selector */}
            <div className="mb-6">
              <label className="text-[12px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-3 block">
                Your role
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setSelectedRole(i)}
                    className={`
                      px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-200
                      ${selectedRole === i
                        ? 'bg-brand-pink text-white border-brand-pink'
                        : 'bg-white text-on-surface-variant border-outline-variant/30 hover:border-brand-pink/30'
                      }
                    `}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[12px] font-bold uppercase tracking-widest text-on-surface-variant/50">
                  Years of experience
                </label>
                <span className="text-[16px] font-bold text-on-surface tabular-nums">
                  {experience} {experience === 1 ? 'year' : 'years'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full h-2 bg-outline-variant/20 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-pink [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant/40 mt-1">
                <span>New</span>
                <span>10+ years</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 mb-2">
                  Traditional Bureau
                </p>
                <motion.p
                  key={`bureau-${bureauTake}`}
                  className="text-[28px] md:text-[36px] font-bold text-error tabular-nums"
                  initial={reduce ? false : { opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  KES {bureauTake.toLocaleString()}
                </motion.p>
                <p className="text-[12px] text-on-surface-variant mt-1">
                  ~60% take-home after bureau cuts
                </p>
              </div>

              <div className="p-5 bg-verified-green/5 rounded-2xl border border-verified-green/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-verified-green/70 mb-2">
                  Mynanny
                </p>
                <motion.p
                  key={`mynanny-${mynannyTake}`}
                  className="text-[28px] md:text-[36px] font-bold text-verified-green tabular-nums"
                  initial={reduce ? false : { opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  KES {mynannyTake.toLocaleString()}
                </motion.p>
                <p className="text-[12px] text-on-surface-variant mt-1">
                  ~92% take-home, small platform fee
                </p>
              </div>
            </div>

            {/* Difference callout */}
            <motion.div
              key={`diff-${difference}`}
              className="mt-4 p-4 bg-chip-bg rounded-2xl text-center"
              initial={reduce ? false : { opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[14px] text-on-surface">
                You keep{' '}
                <span className="font-bold text-brand-pink">
                  KES {difference.toLocaleString()} more
                </span>{' '}
                per month with Mynanny.
              </p>
              <p className="text-[12px] text-on-surface-variant mt-0.5">
                That is KES {(difference * 12).toLocaleString()} more per year.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionEntrance>
    </section>
  )
}

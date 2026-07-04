'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import { SectionHeader } from '@/components/ui/section-header'

type SOSStage = 'idle' | 'holding' | 'sent' | 'confirmed'

export function SOSPhoneDemo() {
  const [stage, setStage] = useState<SOSStage>('idle')
  const [holdProgress, setHoldProgress] = useState(0)
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null)
  const reduce = useReducedMotion()

  function startHold() {
    setStage('holding')
    setHoldProgress(0)
    const interval = setInterval(() => {
      setHoldProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setStage('sent')
          setTimeout(() => setStage('confirmed'), 2400)
          setTimeout(() => {
            setStage('idle')
            setHoldProgress(0)
          }, 6000)
          return 100
        }
        return p + 3.5
      })
    }, 50)
    setTimer(interval)
  }

  function cancelHold() {
    if (timer) clearInterval(timer)
    if (stage === 'holding') {
      setStage('idle')
      setHoldProgress(0)
    }
  }

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timer])

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left - Text content */}
          <SectionEntrance>
            <SectionHeader
              eyebrow={<EyebrowPill icon="health_and_safety" text="Worker safety" />}
              title="Protection that goes beyond placement."
              subtitle="Every worker and every family on Mynanny has access to our safety system. One tap triggers an instant alert chain."
              centered={false}
              className="mb-0"
              subtitleClassName="max-w-lg text-[16px]"
            />

            <div className="mt-10 space-y-6">
              {[
                {
                  icon: 'emergency_share',
                  title: 'In-app SOS',
                  description:
                    'Hold the panic button for 3 seconds. Your emergency contacts and our response team are notified instantly with your live location.',
                },
                {
                  icon: 'contract',
                  title: 'Legal and contract support',
                  description:
                    'We provide legally vetted employment contracts and handle disputes professionally.',
                },
                {
                  icon: 'psychology_alt',
                  title: 'Counseling and training',
                  description:
                    'Ongoing professional development and access to child psychology resources.',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary !text-[22px]">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[17px] font-semibold text-on-surface">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-on-surface-variant leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionEntrance>

          {/* Right - Interactive phone demo */}
          <SectionEntrance delay={0.15}>
            <div className="flex justify-center">
              <div className="relative w-[300px]">
                {/* Phone frame */}
                <div className="w-full aspect-[9/19.5] rounded-[44px] bg-dark-ink border-[5px] border-dark-ink/80 shadow-[0_20px_60px_rgba(28,20,38,0.25)] overflow-hidden">
                  <div className="w-full h-full rounded-[39px] bg-white flex flex-col overflow-hidden">
                    {/* Phone status bar */}
                    <div className="flex items-center justify-between px-6 pt-4 pb-2">
                      <span className="text-[11px] font-semibold text-on-surface">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 rounded-sm bg-on-surface/30" />
                        <div className="w-3.5 h-2.5 rounded-sm bg-on-surface/20" />
                      </div>
                    </div>

                    {/* App header */}
                    <div className="px-5 pb-3 border-b border-outline-variant/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-pink flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">M</span>
                          </div>
                          <span className="text-[14px] font-bold text-on-surface">
                            Mynanny Pro
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-verified-green bg-verified-green/10 px-2 py-0.5 rounded-full">
                          On shift
                        </span>
                      </div>
                    </div>

                    {/* Main SOS area */}
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 relative">
                      <AnimatePresence mode="wait">
                        {(stage === 'idle' || stage === 'holding') && (
                          <motion.div
                            key="sos-button"
                            className="flex flex-col items-center"
                            initial={false}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-[12px] text-on-surface-variant mb-6 text-center">
                              Tap and hold for emergencies
                            </p>

                            {/* Pulse rings */}
                            <div className="relative">
                              {!reduce && stage === 'idle' && (
                                <>
                                  <motion.div
                                    className="absolute inset-[-16px] rounded-full border-2 border-brand-pink/20"
                                    animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                                  />
                                  <motion.div
                                    className="absolute inset-[-32px] rounded-full border-2 border-brand-pink/10"
                                    animate={{ scale: [1, 1.2], opacity: [0.3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                                  />
                                </>
                              )}

                              {stage === 'holding' && (
                                <motion.div
                                  className="absolute inset-[-8px] rounded-full"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                    <circle
                                      cx="60" cy="60" r="56"
                                      fill="none" stroke="#E6175C" strokeWidth="4"
                                      strokeLinecap="round"
                                      strokeDasharray={351.86}
                                      strokeDashoffset={351.86 * (1 - holdProgress / 100)}
                                      style={{ transition: 'stroke-dashoffset 50ms linear' }}
                                    />
                                  </svg>
                                </motion.div>
                              )}

                              {/* SOS button */}
                              <motion.button
                                className="relative z-10 w-[104px] h-[104px] rounded-full bg-brand-pink text-white flex flex-col items-center justify-center shadow-xl cursor-pointer select-none"
                                onPointerDown={startHold}
                                onPointerUp={cancelHold}
                                onPointerLeave={cancelHold}
                                animate={stage === 'holding' ? { scale: 0.95 } : { scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <span
                                  className="material-symbols-outlined !text-[40px]"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  sos
                                </span>
                                <span className="text-[9px] font-bold tracking-[0.2em] mt-1">
                                  {stage === 'holding' ? 'HOLD...' : 'HOLD 3 SEC'}
                                </span>
                              </motion.button>
                            </div>

                            {stage === 'holding' && (
                              <motion.p
                                className="text-[11px] text-brand-pink font-semibold mt-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                Keep holding...
                              </motion.p>
                            )}
                          </motion.div>
                        )}

                        {stage === 'sent' && (
                          <motion.div
                            key="sos-sent"
                            className="flex flex-col items-center text-center px-4"
                            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <motion.div
                              className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4"
                              animate={reduce ? {} : { scale: [1, 1.1, 1] }}
                              transition={{ duration: 0.6 }}
                            >
                              <span className="material-symbols-outlined text-error !text-[32px]">
                                warning
                              </span>
                            </motion.div>
                            <p className="text-[16px] font-bold text-error mb-2">
                              Alert sent
                            </p>
                            <p className="text-[12px] text-on-surface-variant leading-relaxed">
                              Notifying your emergency contacts and our Nairobi response team...
                            </p>

                            {/* Animated contact notifications */}
                            <div className="mt-5 w-full space-y-2">
                              {[
                                { name: 'Jane M. (sister)', delay: 0.3 },
                                { name: 'Mynanny Response Team', delay: 0.7 },
                                { name: 'David K. (husband)', delay: 1.1 },
                              ].map((contact) => (
                                <motion.div
                                  key={contact.name}
                                  className="flex items-center gap-2 bg-error/5 rounded-xl px-3 py-2"
                                  initial={reduce ? false : { opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: contact.delay, duration: 0.4 }}
                                >
                                  <span className="w-5 h-5 rounded-full bg-error/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-error !text-[12px]">
                                      notifications_active
                                    </span>
                                  </span>
                                  <span className="text-[11px] font-medium text-on-surface flex-1 text-left">
                                    {contact.name}
                                  </span>
                                  <motion.span
                                    className="text-[10px] text-verified-green font-semibold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: contact.delay + 0.5 }}
                                  >
                                    Notified
                                  </motion.span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {stage === 'confirmed' && (
                          <motion.div
                            key="sos-confirmed"
                            className="flex flex-col items-center text-center px-4"
                            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <motion.div
                              className="w-16 h-16 rounded-full bg-verified-green/10 flex items-center justify-center mb-4"
                              initial={reduce ? false : { scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            >
                              <span className="material-symbols-outlined text-verified-green !text-[32px]">
                                check_circle
                              </span>
                            </motion.div>
                            <p className="text-[16px] font-bold text-verified-green mb-2">
                              Help is on the way
                            </p>
                            <p className="text-[12px] text-on-surface-variant leading-relaxed mb-4">
                              All 3 contacts notified. Our team has your live location and is coordinating response.
                            </p>

                            {/* Mini map placeholder */}
                            <div className="w-full h-28 bg-surface-container rounded-2xl flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5" />
                              <div className="relative flex flex-col items-center">
                                <motion.div
                                  className="w-4 h-4 rounded-full bg-brand-pink"
                                  animate={reduce ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-[9px] text-on-surface-variant mt-1 font-medium">
                                  Your location shared
                                </span>
                              </div>
                            </div>

                            <p className="text-[10px] text-on-surface-variant/60 mt-4">
                              Demo only. Try holding the button again.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Phone bottom nav */}
                    <div className="flex items-center justify-around px-4 py-3 border-t border-outline-variant/20">
                      {['home', 'work_history', 'sos', 'person'].map((icon, i) => (
                        <div key={icon} className="flex flex-col items-center gap-0.5">
                          <span
                            className={`material-symbols-outlined !text-[20px] ${
                              i === 2 ? 'text-brand-pink' : 'text-on-surface-variant/40'
                            }`}
                            style={i === 2 ? { fontVariationSettings: "'FILL' 1" } : undefined}
                          >
                            {icon}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating 24/7 badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-outline-variant/20 px-4 py-3 flex items-center gap-3"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-error !text-[20px]">
                      emergency
                    </span>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-on-surface">24/7 Rapid Response</p>
                    <p className="text-[10px] text-on-surface-variant">Nairobi-based team</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </SectionEntrance>
        </div>
      </div>
    </section>
  )
}

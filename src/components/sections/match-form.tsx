'use client'

import { useState, useTransition } from 'react'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { PrimaryButton } from '@/components/ui/primary-button'
import type { MarketingContent } from '@/lib/cms-types'
import { DEFAULT_MARKETING } from '@/lib/extended-defaults'
import { submitInquiryAction } from '@/lib/actions/submit-inquiry'

type MatchFormProps = {
  content?: MarketingContent['matchForm']
}

export function MatchForm({ content = DEFAULT_MARKETING.matchForm }: MatchFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      setError(null)
      const result = await submitInquiryAction({
        type: 'match',
        service: String(data.get('service') ?? ''),
        neighborhood: String(data.get('neighborhood') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        message: String(data.get('message') ?? ''),
      })

      if (result.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setError(result.error ?? 'Something went wrong. Please try again.')
      }
    })
  }

  return (
    <section id="match-form" className="max-w-[1280px] mx-auto px-5 md:px-6 py-12">
      <SectionEntrance>
        <div className="double-bezel overflow-hidden">
          <div className="double-bezel-inner !p-0 grid md:grid-cols-12">
            <div className="md:col-span-5 bg-primary p-12 text-white flex flex-col justify-center">
              <h2 className="text-[32px] font-semibold mb-6">{content.title}</h2>
              <p className="text-white/80 mb-8">{content.description}</p>
              <ul className="space-y-4">
                {content.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="material-symbols-outlined">task_alt</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-7 p-12 bg-white">
              {submitted ? (
                <div className="flex flex-col items-center justify-center min-h-[280px] text-center">
                  <span className="material-symbols-outlined text-verified-green !text-[48px] mb-4">check_circle</span>
                  <p className="text-[18px] font-semibold text-on-surface">{content.successMessage}</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[14px] font-bold mb-2" htmlFor="match-service">
                        Service Needed
                      </label>
                      <select
                        id="match-service"
                        name="service"
                        required
                        className="w-full border border-outline-variant/50 rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      >
                        {content.serviceOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold mb-2" htmlFor="match-neighborhood">
                        Neighborhood
                      </label>
                      <input
                        id="match-neighborhood"
                        name="neighborhood"
                        type="text"
                        required
                        placeholder="e.g. Kilimani"
                        className="w-full border border-outline-variant/50 rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold mb-2" htmlFor="match-email">
                        Email Address
                      </label>
                      <input
                        id="match-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full border border-outline-variant/50 rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold mb-2" htmlFor="match-phone">
                        Phone Number
                      </label>
                      <input
                        id="match-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="e.g. 0712 345 678"
                        className="w-full border border-outline-variant/50 rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold mb-2" htmlFor="match-message">
                      Tell us about your home
                    </label>
                    <textarea
                      id="match-message"
                      name="message"
                      required
                      rows={3}
                      placeholder="e.g. 3 bedroom house, 2 kids aged 4 and 6..."
                      className="w-full border border-outline-variant/50 rounded-lg p-3 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-none"
                    />
                  </div>
                  {error && <p className="text-[14px] text-error">{error}</p>}
                  <PrimaryButton
                    type="submit"
                    disabled={pending}
                    showIcon={false}
                    className="w-full justify-center shadow-lg shadow-brand-pink/15"
                  >
                    {pending ? 'Sending...' : 'Request Matches'}
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionEntrance>
    </section>
  )
}

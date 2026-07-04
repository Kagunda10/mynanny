'use client'

import Link from 'next/link'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'
import { PrimaryButton } from '@/components/ui/primary-button'
import { DELETE_ACCOUNT_STEPS, COMPANY } from '@/lib/site-content'

export function DeleteAccountContent() {
  return (
    <LegalPageLayout
      eyebrow="Account"
      title="Delete App Account"
      description="How to permanently remove your MyNanny account and data from our servers."
      updated="July 2026"
    >
      <div className="space-y-6">
        {DELETE_ACCOUNT_STEPS.map((step, i) => (
          <SectionEntrance key={step.step} delay={i * 0.06}>
            <div className="double-bezel">
              <div className="double-bezel-inner flex gap-5">
                <span className="text-[36px] font-bold text-primary/15 shrink-0 leading-none">
                  {step.step}
                </span>
                <div>
                  <h2 className="text-[18px] font-bold text-on-surface mb-1">{step.title}</h2>
                  <p className="text-[15px] text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </SectionEntrance>
        ))}

        <SectionEntrance delay={0.35}>
          <div className="p-6 bg-surface-container-low rounded-[22px] border border-outline-variant/20 mt-8">
            <p className="text-[14px] text-on-surface-variant leading-relaxed">
              Need help deleting your account? Email{' '}
              <a href={`mailto:${COMPANY.supportEmail}`} className="text-brand-pink font-semibold">
                {COMPANY.supportEmail}
              </a>{' '}
              and we will assist you. See also our{' '}
              <Link href="/privacy" className="text-brand-pink font-semibold hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-brand-pink font-semibold hover:underline">
                Terms
              </Link>
              .
            </p>
          </div>
        </SectionEntrance>

        <SectionEntrance delay={0.4}>
          <div className="text-center pt-6">
            <PrimaryButton href={COMPANY.appUrl} icon="open_in_new">
              Open MyNanny App
            </PrimaryButton>
          </div>
        </SectionEntrance>
      </div>
    </LegalPageLayout>
  )
}

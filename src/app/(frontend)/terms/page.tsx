import type { Metadata } from 'next'
import { LegalPageLayout, LegalProse } from '@/components/legal/legal-page-layout'
import { getLegalContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Terms and Conditions | MyNanny',
  description:
    'Terms and conditions for using the MyNanny website and app. Matching service for domestic workers and employers in Kenya.',
}

export default async function TermsPage() {
  const legal = await getLegalContent()

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms and Conditions"
      description={legal.terms.description}
      updated={legal.terms.updated}
    >
      <LegalProse sections={legal.terms.sections} />
    </LegalPageLayout>
  )
}

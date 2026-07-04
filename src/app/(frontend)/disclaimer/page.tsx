import type { Metadata } from 'next'
import { LegalPageLayout, LegalProse } from '@/components/legal/legal-page-layout'
import { getLegalContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Disclaimer | MyNanny',
  description: 'Disclaimer for information provided on the MyNanny website.',
}

export default async function DisclaimerPage() {
  const legal = await getLegalContent()

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Disclaimer"
      description={legal.disclaimer.description}
      updated={legal.disclaimer.updated}
    >
      <LegalProse sections={legal.disclaimer.sections} />
    </LegalPageLayout>
  )
}

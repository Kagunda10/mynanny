import type { Metadata } from 'next'
import { LegalPageLayout, LegalProse } from '@/components/legal/legal-page-layout'
import { getLegalContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Privacy Policy | Mynanny',
  description:
    'How Mynanny collects, uses, and protects your personal information under the Kenya Data Protection Act.',
}

export default async function PrivacyPage() {
  const legal = await getLegalContent()

  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      description={legal.privacy.description}
      updated={legal.privacy.updated}
    >
      <LegalProse sections={legal.privacy.sections} />
    </LegalPageLayout>
  )
}

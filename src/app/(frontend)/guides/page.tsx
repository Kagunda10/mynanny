import type { Metadata } from 'next'
import { GuidesContent } from './content'
import { getArticles } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Guides & Resources | Mynanny',
  description:
    'Helpful guides for Nairobi homeowners on hiring, managing, and supporting domestic professionals — from NHIF to interview tips.',
}

export default async function GuidesPage() {
  const cmsArticles = await getArticles(24)

  return <GuidesContent cmsArticles={cmsArticles} />
}

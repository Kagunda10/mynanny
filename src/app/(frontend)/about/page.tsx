import type { Metadata } from 'next'
import { AboutContent } from './content'
import { getAboutContent, getTeamMembers, getTimeline } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'About Us | Mynanny',
  description: 'Learn about Mynanny — Kenya\'s trusted platform for vetted domestic help since 2024.',
}

export default async function AboutPage() {
  const [about, timeline, team] = await Promise.all([
    getAboutContent(),
    getTimeline(),
    getTeamMembers(),
  ])

  return <AboutContent about={about} timeline={timeline} team={team} />
}

import type { Metadata } from 'next'
import { WhyMynannyContent } from './content'
import {
  getCoverageContent,
  getFaqByPage,
  getHomepageContent,
  getMarketingContent,
  getTestimonials,
} from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Why Mynanny | Premium Childcare Excellence',
  description:
    'Discover why Nairobi families choose Mynanny — rigorous 5-step vetting, transparent pricing, continuous support, and the highest retention rate in Kenya.',
}

export default async function WhyMynannyPage() {
  const [coverage, testimonials, faqItems, homepage, marketing] = await Promise.all([
    getCoverageContent(),
    getTestimonials(),
    getFaqByPage('how-it-works'),
    getHomepageContent(),
    getMarketingContent(),
  ])

  return (
    <WhyMynannyContent
      coverage={coverage}
      testimonials={testimonials}
      faqItems={faqItems}
      aggregateRating={homepage.aggregateRating}
      reviewCount={homepage.reviewCount}
      marketing={marketing}
    />
  )
}

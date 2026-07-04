import type { Metadata } from 'next'
import { WhyMyNannyContent } from './content'
import {
  getCoverageContent,
  getFaqByPage,
  getHomepageContent,
  getMarketingContent,
  getTestimonials,
} from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Why MyNanny | Premium Childcare Excellence',
  description:
    'Discover why Nairobi families choose MyNanny — rigorous 5-step vetting, transparent pricing, continuous support, and the highest retention rate in Kenya.',
}

export default async function WhyMyNannyPage() {
  const [coverage, testimonials, faqItems, homepage, marketing] = await Promise.all([
    getCoverageContent(),
    getTestimonials(),
    getFaqByPage('how-it-works'),
    getHomepageContent(),
    getMarketingContent(),
  ])

  return (
    <WhyMyNannyContent
      coverage={coverage}
      testimonials={testimonials}
      faqItems={faqItems}
      aggregateRating={homepage.aggregateRating}
      reviewCount={homepage.reviewCount}
      marketing={marketing}
    />
  )
}

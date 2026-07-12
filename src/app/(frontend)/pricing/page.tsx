import type { Metadata } from 'next'
import { PricingContent } from './content'
import {
  getCoverageContent,
  getFaqByPage,
  getHomepageContent,
  getMarketingContent,
  getPricingContent,
  getTestimonials,
} from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Pricing | Nanny & Cleaning Costs in Nairobi | Mynanny',
  description:
    'Transparent pricing for nannies, caregivers, gardeners, and deep cleaning teams in Nairobi. Updated monthly from real placements. Pay via M-Pesa.',
}

export default async function PricingPage() {
  const [pricing, coverage, testimonials, faqItems, homepage, marketing] = await Promise.all([
    getPricingContent(),
    getCoverageContent(),
    getTestimonials(),
    getFaqByPage('pricing'),
    getHomepageContent(),
    getMarketingContent(),
  ])

  return (
    <PricingContent
      rolePricing={pricing.rolePricing}
      feeBreakdown={pricing.feeBreakdown}
      lastUpdated={pricing.lastUpdated}
      coverage={coverage}
      testimonials={testimonials}
      faqItems={faqItems}
      aggregateRating={homepage.aggregateRating}
      reviewCount={homepage.reviewCount}
      marketing={marketing}
    />
  )
}

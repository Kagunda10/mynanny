import { Hero } from '@/components/sections/hero'
import { Marquee } from '@/components/sections/marquee'
import { LiveActivity } from '@/components/sections/live-activity'
import { RolesBento } from '@/components/sections/roles-bento'
import { VettingPipeline } from '@/components/sections/vetting-pipeline'
import { CoverageMap } from '@/components/sections/coverage-map'
import { PricingTable } from '@/components/sections/pricing-table'
import { GoogleReviews } from '@/components/sections/google-reviews'
import { HireSteps } from '@/components/sections/hire-steps'
import { VideoTestimonial } from '@/components/sections/video-testimonial'
import { ComparisonStrip } from '@/components/sections/comparison-strip'
import { MatchForm } from '@/components/sections/match-form'
import { FAQ } from '@/components/sections/faq'
import { BlogPreview } from '@/components/sections/blog-preview'
import { AppCTA } from '@/components/sections/app-cta'
import { JsonLd } from '@/components/json-ld'
import {
  getCoverageContent,
  getFaqByPage,
  getHomepageContent,
  getMarketingContent,
  getPricingContent,
  getArticles,
  getTestimonials,
} from '@/lib/cms'

export default async function HomePage() {
  const [homepage, pricing, coverage, testimonials, homeFaq, articles, marketing] = await Promise.all([
    getHomepageContent(),
    getPricingContent(),
    getCoverageContent(),
    getTestimonials(),
    getFaqByPage('home'),
    getArticles(3),
    getMarketingContent(),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mynanny',
    description: 'Vetted nannies and cleaners in Kenya',
    url: 'https://mynanny.co.ke',
    logo: 'https://mynanny.co.ke/brand/svg/lockup-horizontal-color.svg',
    image: 'https://mynanny.co.ke/og-image.png',
    areaServed: {
      '@type': 'City',
      name: 'Nairobi',
      containedInPlace: { '@type': 'Country', name: 'Kenya' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(homepage.aggregateRating),
      reviewCount: String(homepage.reviewCount),
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero content={homepage} />
      <Marquee
        neighborhoods={homepage.marqueeNeighborhoods}
        services={homepage.marqueeServices}
      />
      <LiveActivity messages={homepage.activityMessages} />
      <RolesBento />
      <VettingPipeline content={marketing.vetting} />
      <CoverageMap content={coverage} />
      <PricingTable rows={pricing.tableRows} lastUpdated={pricing.lastUpdated} />
      <GoogleReviews
        reviews={testimonials}
        aggregateRating={homepage.aggregateRating}
        reviewCount={homepage.reviewCount}
      />
      <HireSteps content={marketing.hireSteps} />
      <VideoTestimonial />
      <ComparisonStrip content={marketing.comparison} />
      <MatchForm content={marketing.matchForm} />
      <FAQ items={homeFaq} />
      <BlogPreview articles={articles} />
      <AppCTA content={marketing.appCta} />
    </>
  )
}

import type { Metadata } from 'next'
import { ServicesClient } from './services-client'
import { getServices, getTestimonials } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    "Explore Mynanny's professional home services — nannies, deep cleaning, and elderly care. Use our instant pricing calculator to estimate costs for Nairobi families.",
}

export default async function ServicesPage() {
  const [services, reviews] = await Promise.all([getServices(), getTestimonials()])

  return <ServicesClient services={services} reviews={reviews} />
}

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/why-mynanny`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/join`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/guides`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/delete-account`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  return staticPages.map((page) => ({
    ...page,
    lastModified: new Date(),
  }))
}

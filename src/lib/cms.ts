import { getPayload } from '@/lib/payload'
import type {
  AboutContent,
  ArticlePreview,
  ContactPageContent,
  CoverageContent,
  FaqItem,
  HomepageContent,
  LegalContent,
  LegalPageContent,
  MarketingContent,
  PricingContent,
  ServiceCard,
  SiteSettingsContent,
  TeamMember,
  TestimonialReview,
  TimelineItem,
} from '@/lib/cms-types'
import type { Article, Faq, Service, Team, Testimonial, Timeline } from '@/payload-types'
import {
  DEFAULT_ARTICLES,
  DEFAULT_COVERAGE,
  DEFAULT_HOME_FAQ,
  DEFAULT_HOMEPAGE,
  DEFAULT_HOW_IT_WORKS_FAQ,
  DEFAULT_PRICING,
  DEFAULT_PRICING_FAQ,
  DEFAULT_SERVICES,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TESTIMONIALS,
} from '@/lib/defaults'
import {
  DEFAULT_ABOUT,
  DEFAULT_CONTACT_PAGE,
  DEFAULT_LEGAL,
  DEFAULT_MARKETING,
  DEFAULT_TIMELINE,
  mapLegalSections,
} from '@/lib/extended-defaults'

const COLOR_MAP = {
  primary: 'bg-primary-fixed text-primary',
  secondary: 'bg-secondary-fixed text-secondary',
  tertiary: 'bg-tertiary-fixed text-tertiary',
} as const

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
      return fallback
    }
    return await fn()
  } catch (error) {
    console.error('[cms] fetch failed, using defaults:', error)
    return fallback
  }
}

export async function getHomepageContent(): Promise<HomepageContent> {
  return safeFetch(async () => {
    const payload = await getPayload()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await payload.findGlobal({ slug: 'homepage' })) as any

    return {
      heroEyebrow: data.heroEyebrow ?? DEFAULT_HOMEPAGE.heroEyebrow,
      heroHeadline: data.heroHeadline ?? DEFAULT_HOMEPAGE.heroHeadline,
      heroSubheadline: data.heroSubheadline ?? DEFAULT_HOMEPAGE.heroSubheadline,
      heroCtaText: data.heroCtaText ?? DEFAULT_HOMEPAGE.heroCtaText,
      heroCtaUrl: data.heroCtaUrl ?? DEFAULT_HOMEPAGE.heroCtaUrl,
      heroImage: data.heroImage ?? DEFAULT_HOMEPAGE.heroImage,
      stats:
        data.stats?.length
          ? data.stats.map((s: { label?: string; value?: string; numericTarget?: number; suffix?: string }) => ({
              label: s.label ?? '',
              value: s.value ?? '',
              numericTarget: s.numericTarget ?? undefined,
              suffix: s.suffix ?? undefined,
            }))
          : DEFAULT_HOMEPAGE.stats,
      activityMessages:
        data.activityMessages?.length
          ? data.activityMessages.map((m: { message?: string }) => m.message ?? '').filter(Boolean)
          : DEFAULT_HOMEPAGE.activityMessages,
      marqueeNeighborhoods:
        data.marqueeNeighborhoods?.length
          ? data.marqueeNeighborhoods.map((n: { name?: string }) => n.name ?? '').filter(Boolean)
          : DEFAULT_HOMEPAGE.marqueeNeighborhoods,
      marqueeServices:
        data.marqueeServices?.length
          ? data.marqueeServices.map((s: { name?: string }) => s.name ?? '').filter(Boolean)
          : DEFAULT_HOMEPAGE.marqueeServices,
      aggregateRating: data.aggregateRating ?? DEFAULT_HOMEPAGE.aggregateRating,
      reviewCount: data.reviewCount ?? DEFAULT_HOMEPAGE.reviewCount,
    }
  }, DEFAULT_HOMEPAGE)
}

export async function getPricingContent(): Promise<PricingContent> {
  return safeFetch(async () => {
    const payload = await getPayload()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await payload.findGlobal({ slug: 'pricing' })) as any

    return {
      tableRows:
        data.tableRows?.length
          ? data.tableRows.map((r: { service?: string; bookingFee?: string; rate?: string }) => ({
              service: r.service ?? '',
              bookingFee: r.bookingFee ?? '',
              rate: r.rate ?? '',
            }))
          : DEFAULT_PRICING.tableRows,
      rolePricing:
        data.rolePricing?.length
          ? data.rolePricing.map((r: { role?: string; low?: number; high?: number; period?: string; note?: string; details?: string; popular?: boolean }) => ({
              role: r.role ?? '',
              low: r.low ?? 0,
          high: r.high ?? undefined,
              period: r.period ?? '/month',
              note: r.note ?? '',
              details: r.details ?? '',
              popular: r.popular ?? false,
            }))
          : DEFAULT_PRICING.rolePricing,
      feeBreakdown:
        data.feeBreakdown?.length
          ? data.feeBreakdown.map((f: { label?: string; value?: string; type?: string }) => ({
              label: f.label ?? '',
              value: f.value ?? '',
              type: (f.type as 'free' | 'fee' | 'direct') ?? 'free',
            }))
          : DEFAULT_PRICING.feeBreakdown,
      lastUpdated: data.lastUpdated ?? DEFAULT_PRICING.lastUpdated,
    }
  }, DEFAULT_PRICING)
}

export async function getCoverageContent(): Promise<CoverageContent> {
  return safeFetch(async () => {
    const payload = await getPayload()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await payload.findGlobal({ slug: 'coverage' })) as any

    const loc = data.location ?? {}
    const section = data.section ?? {}

    const neighborhoods =
      data.neighborhoods?.length
        ? data.neighborhoods.map(
            (n: {
              name?: string
              workers?: number
              latitude?: number
              longitude?: number
              lat?: number
              left?: number
              popularServices?: { service?: string }[]
            }) => ({
              name: n.name ?? '',
              workers: n.workers ?? 0,
              latitude: n.latitude ?? n.lat ?? DEFAULT_COVERAGE.location.centerLat,
              longitude: n.longitude ?? n.left ?? DEFAULT_COVERAGE.location.centerLng,
              popular: n.popularServices?.map((s: { service?: string }) => s.service ?? '').filter(Boolean) ?? [],
            }),
          )
        : DEFAULT_COVERAGE.neighborhoods

    return {
      location: {
        regionLabel: loc.regionLabel ?? DEFAULT_COVERAGE.location.regionLabel,
        centerLat: loc.centerLat ?? DEFAULT_COVERAGE.location.centerLat,
        centerLng: loc.centerLng ?? DEFAULT_COVERAGE.location.centerLng,
        zoom: loc.zoom ?? DEFAULT_COVERAGE.location.zoom,
      },
      section: {
        eyebrow: section.eyebrow ?? DEFAULT_COVERAGE.section.eyebrow,
        title: section.title ?? DEFAULT_COVERAGE.section.title,
        subtitle: section.subtitle ?? DEFAULT_COVERAGE.section.subtitle,
      },
      neighborhoods,
      totalWorkers: data.totalWorkers ?? DEFAULT_COVERAGE.totalWorkers,
      avgMatchHours: data.avgMatchHours ?? DEFAULT_COVERAGE.avgMatchHours,
    }
  }, DEFAULT_COVERAGE)
}

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  return safeFetch(async () => {
    const payload = await getPayload()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await payload.findGlobal({ slug: 'site-settings' })) as any

    return {
      siteName: data.siteName ?? DEFAULT_SITE_SETTINGS.siteName,
      tagline: data.tagline ?? DEFAULT_SITE_SETTINGS.tagline,
      footerBlurb: data.footerBlurb ?? DEFAULT_SITE_SETTINGS.footerBlurb,
      phone: data.phone ?? DEFAULT_SITE_SETTINGS.phone,
      email: data.email ?? DEFAULT_SITE_SETTINGS.email,
      whatsapp: data.whatsapp ?? DEFAULT_SITE_SETTINGS.whatsapp,
      address: data.address ?? DEFAULT_SITE_SETTINGS.address,
      navItems:
        data.navItems?.length
          ? data.navItems.map((n: { label?: string; href?: string }) => ({ label: n.label ?? '', href: n.href ?? '/' }))
          : DEFAULT_SITE_SETTINGS.navItems,
      footerColumns:
        data.footerColumns?.length
          ? data.footerColumns.map((col: { title?: string; links?: { label?: string; href?: string }[] }) => ({
              title: col.title ?? '',
              links: col.links?.map((l: { label?: string; href?: string }) => ({ label: l.label ?? '', href: l.href ?? '/' })) ?? [],
            }))
          : DEFAULT_SITE_SETTINGS.footerColumns,
      socialLinks:
        data.socialLinks?.length
          ? data.socialLinks.map((s: { platform?: string; url?: string }) => ({ platform: s.platform ?? '', url: s.url ?? '#' }))
          : DEFAULT_SITE_SETTINGS.socialLinks,
    }
  }, DEFAULT_SITE_SETTINGS)
}

export async function getTestimonials(limit = 6): Promise<TestimonialReview[]> {
  return safeFetch(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'testimonials',
      sort: 'order',
      limit,
      where: { featured: { equals: true } },
    })

    if (!docs.length) return DEFAULT_TESTIMONIALS

    return docs.map((t: Testimonial) => ({
      rating: t.rating ?? 5,
      body: t.quote.startsWith('"') ? t.quote : `"${t.quote}"`,
      initials: t.initials ?? t.clientName.slice(0, 2).toUpperCase(),
      name: t.clientName,
      location: t.location ?? 'Verified Client',
      color: COLOR_MAP[t.colorVariant ?? 'primary'],
      reply: t.ownerReply ?? undefined,
    }))
  }, DEFAULT_TESTIMONIALS)
}

export async function getFaqByPage(page: 'home' | 'pricing' | 'how-it-works'): Promise<FaqItem[]> {
  const fallbacks = {
    home: DEFAULT_HOME_FAQ,
    pricing: DEFAULT_PRICING_FAQ,
    'how-it-works': DEFAULT_HOW_IT_WORKS_FAQ,
  }

  return safeFetch(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'faq',
      sort: 'order',
      limit: 20,
      where: { pages: { contains: page } },
    })

    if (!docs.length) return fallbacks[page]

    return docs.map((f: Faq) => ({
      question: f.question,
      answer: f.answer,
    }))
  }, fallbacks[page])
}

export async function getServices(): Promise<ServiceCard[]> {
  return safeFetch(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'services',
      sort: 'order',
      limit: 20,
    })

    if (!docs.length) return DEFAULT_SERVICES

    return docs.map((s: Service) => ({
      name: s.name,
      slug: s.slug,
      description: s.description ?? '',
      icon: s.icon ?? 'home',
      basePrice: s.basePrice ?? 0,
      unit: s.unit ?? '',
      popular: s.popular ?? false,
      tag: s.tag ?? undefined,
      tagColor: s.tagColor ?? undefined,
      image: s.image ?? undefined,
    }))
  }, DEFAULT_SERVICES)
}

export async function getArticles(limit = 12): Promise<ArticlePreview[]> {
  return safeFetch(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'articles',
      sort: '-publishedAt',
      limit,
      where: { status: { equals: 'published' } },
    })

    if (!docs.length) return DEFAULT_ARTICLES

    return docs.map((a: Article) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? '',
      category: a.category ?? 'Guides',
      readTime: a.readTime ?? '5 min read',
      featured: a.featured ?? false,
      author: a.author ?? undefined,
      image:
        typeof a.featuredImage === 'object' && a.featuredImage?.url
          ? a.featuredImage.url
          : a.imageUrl ?? undefined,
    }))
  }, DEFAULT_ARTICLES)
}

export async function getArticleBySlug(slug: string) {
  return safeFetch(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'articles',
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
      },
    })

    const article = docs[0] as Article | undefined
    if (!article) return null

    return {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt ?? '',
      category: article.category ?? 'Guides',
      readTime: article.readTime ?? '5 min read',
      author: article.author ?? 'MyNanny Team',
      body: article.body ?? '',
      image:
        typeof article.featuredImage === 'object' && article.featuredImage?.url
          ? article.featuredImage.url
          : article.imageUrl ?? undefined,
    }
  }, null)
}

/** Fetch all shared section data used across multiple pages */
export async function getSharedSectionData() {
  const [pricing, coverage, testimonials, homeFaq, pricingFaq, howItWorksFaq, articles] =
    await Promise.all([
      getPricingContent(),
      getCoverageContent(),
      getTestimonials(),
      getFaqByPage('home'),
      getFaqByPage('pricing'),
      getFaqByPage('how-it-works'),
      getArticles(6),
    ])

  return { pricing, coverage, testimonials, homeFaq, pricingFaq, howItWorksFaq, articles }
}

export type SharedSectionData = Awaited<ReturnType<typeof getSharedSectionData>>

export async function getMarketingContent(): Promise<MarketingContent> {
  return safeFetch<MarketingContent>(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await getPayload().then((p) => p.findGlobal({ slug: 'marketing' }))) as any
    const v = data.vetting ?? {}
    const h = data.hireSteps ?? {}
    const c = data.comparison ?? {}
    const a = data.appCta ?? {}
    const m = data.matchForm ?? {}

    return {
      vetting: {
        title: v.title ?? DEFAULT_MARKETING.vetting.title,
        passRate: v.passRate ?? DEFAULT_MARKETING.vetting.passRate,
        steps: v.steps?.length
          ? v.steps.map((s: { icon?: string; title?: string; description?: string; isFinal?: boolean }) => ({
              icon: s.icon ?? 'verified',
              title: s.title ?? '',
              description: s.description ?? '',
              isFinal: s.isFinal ?? false,
            }))
          : DEFAULT_MARKETING.vetting.steps,
      },
      hireSteps: {
        title: h.title ?? DEFAULT_MARKETING.hireSteps.title,
        description: h.description ?? DEFAULT_MARKETING.hireSteps.description,
        ctaText: h.ctaText ?? DEFAULT_MARKETING.hireSteps.ctaText,
        ctaHref: h.ctaHref ?? DEFAULT_MARKETING.hireSteps.ctaHref,
        steps: h.steps?.length
          ? h.steps.map((s: { number?: string; title?: string; description?: string; stickyTop?: string; isFinal?: boolean }) => ({
              number: s.number ?? '1',
              title: s.title ?? '',
              description: s.description ?? '',
              stickyTop: s.stickyTop ?? '100px',
              isFinal: s.isFinal ?? false,
            }))
          : DEFAULT_MARKETING.hireSteps.steps,
      },
      comparison: {
        title: c.title ?? DEFAULT_MARKETING.comparison.title,
        columns: c.columns?.length
          ? c.columns.map((col: { label?: string; note?: string; variant?: string }) => ({
              label: col.label ?? '',
              note: col.note ?? '',
              variant: (col.variant as 'negative' | 'highlighted') ?? 'negative',
            }))
          : DEFAULT_MARKETING.comparison.columns,
      },
      appCta: {
        title: a.title ?? DEFAULT_MARKETING.appCta.title,
        description: a.description ?? DEFAULT_MARKETING.appCta.description,
        appStoreUrl: a.appStoreUrl ?? DEFAULT_MARKETING.appCta.appStoreUrl,
        playStoreUrl: a.playStoreUrl ?? DEFAULT_MARKETING.appCta.playStoreUrl,
        image: a.image ?? DEFAULT_MARKETING.appCta.image,
      },
      matchForm: {
        title: m.title ?? DEFAULT_MARKETING.matchForm.title,
        description: m.description ?? DEFAULT_MARKETING.matchForm.description,
        benefits: m.benefits?.length
          ? m.benefits.map((b: { text?: string }) => b.text ?? '').filter(Boolean)
          : DEFAULT_MARKETING.matchForm.benefits,
        serviceOptions: m.serviceOptions?.length
          ? m.serviceOptions.map((o: { label?: string }) => o.label ?? '').filter(Boolean)
          : DEFAULT_MARKETING.matchForm.serviceOptions,
        successMessage: m.successMessage ?? DEFAULT_MARKETING.matchForm.successMessage,
      },
    } satisfies MarketingContent
  }, DEFAULT_MARKETING)
}

export async function getAboutContent(): Promise<AboutContent> {
  return safeFetch(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await getPayload().then((p) => p.findGlobal({ slug: 'about-page' }))) as any
    return {
      heroTitle: data.heroTitle ?? DEFAULT_ABOUT.heroTitle,
      heroImage: data.heroImage ?? DEFAULT_ABOUT.heroImage,
      originStory: data.originStory ?? DEFAULT_ABOUT.originStory,
      bodyStory: data.bodyStory ?? DEFAULT_ABOUT.bodyStory,
      storyImage: data.storyImage ?? DEFAULT_ABOUT.storyImage,
      mission: data.mission ?? DEFAULT_ABOUT.mission,
      vision: data.vision ?? DEFAULT_ABOUT.vision,
      values: data.values?.length
        ? data.values.map((v: { title?: string; description?: string }) => ({
            title: v.title ?? '',
            description: v.description ?? '',
          }))
        : DEFAULT_ABOUT.values,
      impactStats: data.impactStats?.length
        ? data.impactStats.map((s: { value?: number; suffix?: string; label?: string; color?: string }) => ({
            value: s.value ?? 0,
            suffix: s.suffix ?? undefined,
            label: s.label ?? '',
            color: (s.color as 'primary' | 'secondary' | 'tertiary') ?? 'primary',
          }))
        : DEFAULT_ABOUT.impactStats,
      ctaTitle: data.ctaTitle ?? DEFAULT_ABOUT.ctaTitle,
      ctaDescription: data.ctaDescription ?? DEFAULT_ABOUT.ctaDescription,
    }
  }, DEFAULT_ABOUT)
}

export async function getTimeline(): Promise<TimelineItem[]> {
  return safeFetch(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({ collection: 'timeline', sort: 'order', limit: 20 })
    if (!docs.length) return DEFAULT_TIMELINE
    return docs.map((t: Timeline) => ({
      year: t.year,
      title: t.title,
      description: t.description ?? '',
      image: t.image ?? '',
    }))
  }, DEFAULT_TIMELINE)
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const defaultTeam: TeamMember[] = [
    { name: 'Alexander', role: 'Co-Founder', bio: 'Co-founded MyNanny in 2024.' },
    { name: 'James', role: 'Co-Founder', bio: 'Co-founded MyNanny in 2024.' },
  ]

  return safeFetch<TeamMember[]>(async () => {
    const payload = await getPayload()
    const { docs } = await payload.find({ collection: 'team', sort: 'order', limit: 20 })
    if (!docs.length) return defaultTeam

    const seen = new Set<string>()
    return docs
      .map((t: Team) => ({
        id: String(t.id),
        name: t.name,
        role: t.role,
        bio: t.bio ?? undefined,
        image: typeof t.photo === 'object' && t.photo?.url ? t.photo.url : undefined,
      }))
      .filter((member) => {
        if (seen.has(member.name)) return false
        seen.add(member.name)
        return true
      })
  }, defaultTeam)
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  return safeFetch(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await getPayload().then((p) => p.findGlobal({ slug: 'contact-page' }))) as any
    return {
      heroTitle: data.heroTitle ?? DEFAULT_CONTACT_PAGE.heroTitle,
      heroDescription: data.heroDescription ?? DEFAULT_CONTACT_PAGE.heroDescription,
      intents: data.intents?.length
        ? data.intents.map((i: {
            id?: string
            icon?: string
            title?: string
            summary?: string
            bestChannel?: ContactPageContent['intents'][0]['bestChannel']
            responseTime?: string
            actionLabel?: string
            actionHref?: string
            includeWhenContacting?: Array<string | { item?: string }>
          }) => ({
            id: i.id ?? '',
            icon: i.icon ?? 'help',
            title: i.title ?? '',
            summary: i.summary ?? '',
            bestChannel: i.bestChannel ?? 'form',
            responseTime: i.responseTime ?? '',
            actionLabel: i.actionLabel ?? '',
            actionHref: i.actionHref ?? '/contact',
            includeWhenContacting:
              i.includeWhenContacting?.map((x) => (typeof x === 'string' ? x : x.item ?? '')).filter(Boolean) ?? [],
          }))
        : DEFAULT_CONTACT_PAGE.intents,
      slas: data.slas?.length
        ? data.slas.map((s: { label?: string; value?: string; detail?: string }) => ({
            label: s.label ?? '',
            value: s.value ?? '',
            detail: s.detail ?? '',
          }))
        : DEFAULT_CONTACT_PAGE.slas,
      disputeSteps: data.disputeSteps?.length
        ? data.disputeSteps.map((s: { step?: string; title?: string; description?: string }) => ({
            step: s.step ?? '',
            title: s.title ?? '',
            description: s.description ?? '',
          }))
        : DEFAULT_CONTACT_PAGE.disputeSteps,
      refundRules: data.refundRules?.length
        ? data.refundRules.map((r: { scenario?: string; outcome?: string }) => ({
            scenario: r.scenario ?? '',
            outcome: r.outcome ?? '',
          }))
        : DEFAULT_CONTACT_PAGE.refundRules,
      inquiryTypes: data.inquiryTypes?.length
        ? data.inquiryTypes.map((t: { value?: string; label?: string }) => ({
            value: t.value ?? '',
            label: t.label ?? '',
          }))
        : DEFAULT_CONTACT_PAGE.inquiryTypes,
      selfServiceLinks: data.selfServiceLinks?.length
        ? data.selfServiceLinks.map((l: { label?: string; href?: string }) => ({
            label: l.label ?? '',
            href: l.href ?? '/',
          }))
        : DEFAULT_CONTACT_PAGE.selfServiceLinks,
    }
  }, DEFAULT_CONTACT_PAGE)
}

function mapLegalPage(
  group: { updated?: string; description?: string; sections?: Parameters<typeof mapLegalSections>[0] } | undefined,
  fallback: LegalPageContent,
): LegalPageContent {
  if (!group) return fallback
  const sections = mapLegalSections(group.sections)
  return {
    updated: group.updated ?? fallback.updated,
    description: group.description ?? fallback.description,
    sections: sections.length ? sections : fallback.sections,
  }
}

export async function getLegalContent(): Promise<LegalContent> {
  return safeFetch(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await getPayload().then((p) => p.findGlobal({ slug: 'legal' }))) as any
    return {
      terms: mapLegalPage(data.terms, DEFAULT_LEGAL.terms),
      privacy: mapLegalPage(data.privacy, DEFAULT_LEGAL.privacy),
      disclaimer: mapLegalPage(data.disclaimer, DEFAULT_LEGAL.disclaimer),
    }
  }, DEFAULT_LEGAL)
}

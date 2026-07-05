export type FaqItem = {
  question: string
  answer: string
}

export type NavItem = {
  label: string
  href: string
}

export type FooterColumn = {
  title: string
  links: NavItem[]
}

export type StatItem = {
  label: string
  value: string
  numericTarget?: number
  suffix?: string
}

export type PricingTableRow = {
  service: string
  bookingFee: string
  rate: string
}

export type RolePricing = {
  role: string
  low: number
  high: number
  period: string
  note: string
  details: string
  popular?: boolean
}

export type FeeBreakdownItem = {
  label: string
  value: string
  type: 'free' | 'fee' | 'direct'
}

export type Neighborhood = {
  name: string
  workers: number
  latitude: number
  longitude: number
  popular: string[]
}

export type CoverageMapLocation = {
  regionLabel: string
  centerLat: number
  centerLng: number
  zoom: number
}

export type CoverageSectionCopy = {
  eyebrow: string
  title: string
  subtitle: string
}

export type TestimonialReview = {
  rating: number
  body: string
  initials: string
  name: string
  location: string
  color: 'bg-primary-fixed text-primary' | 'bg-secondary-fixed text-secondary' | 'bg-tertiary-fixed text-tertiary'
  reply?: string
}

export type ServiceCard = {
  name: string
  slug: string
  description: string
  icon: string
  basePrice: number
  unit: string
  popular: boolean
  tag?: string
  tagColor?: string
  image?: string
}

export type ArticlePreview = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image?: string
  featured?: boolean
  author?: string
}

export type HomepageContent = {
  heroEyebrow: string
  heroHeadline: string
  heroSubheadline: string
  heroCtaText: string
  heroCtaUrl: string
  heroImage: string
  stats: StatItem[]
  activityMessages: string[]
  marqueeNeighborhoods: string[]
  marqueeServices: string[]
  aggregateRating: number
  reviewCount: number
}

export type PricingContent = {
  tableRows: PricingTableRow[]
  rolePricing: RolePricing[]
  feeBreakdown: FeeBreakdownItem[]
  lastUpdated: string
}

export type CoverageContent = {
  location: CoverageMapLocation
  section: CoverageSectionCopy
  neighborhoods: Neighborhood[]
  totalWorkers: number
  avgMatchHours: number
}

export type SiteSettingsContent = {
  siteName: string
  tagline: string
  footerBlurb: string
  phone: string
  email: string
  whatsapp: string
  address: string
  navItems: NavItem[]
  footerColumns: FooterColumn[]
  socialLinks: { platform: string; url: string }[]
}

export type VettingStep = {
  icon: string
  title: string
  description: string
  isFinal?: boolean
}

export type HireStep = {
  number: string
  title: string
  description: string
  stickyTop: string
  isFinal?: boolean
}

export type ComparisonColumn = {
  label: string
  note: string
  variant: 'negative' | 'highlighted'
}

export type MarketingContent = {
  vetting: { title: string; passRate: string; steps: VettingStep[] }
  hireSteps: {
    title: string
    description: string
    ctaText: string
    ctaHref: string
    steps: HireStep[]
  }
  comparison: { title: string; columns: ComparisonColumn[] }
  appCta: {
    title: string
    description: string
    appStoreUrl?: string
    playStoreUrl?: string
    image: string
  }
  matchForm: {
    title: string
    description: string
    benefits: string[]
    serviceOptions: string[]
    successMessage: string
  }
}

export type AboutValue = { title: string; description: string }

export type ImpactStat = {
  value: number
  suffix?: string
  label: string
  color: 'primary' | 'secondary' | 'tertiary'
}

export type AboutContent = {
  heroTitle: string
  heroImage: string
  originStory: string
  bodyStory: string
  storyImage: string
  mission: string
  vision: string
  values: AboutValue[]
  impactStats: ImpactStat[]
  ctaTitle: string
  ctaDescription: string
}

export type TimelineItem = {
  year: string
  title: string
  description: string
  image: string
}

export type TeamMember = {
  id?: string
  name: string
  role: string
  bio?: string
  image?: string
}

export type ContactIntent = {
  id: string
  icon: string
  title: string
  summary: string
  bestChannel: 'whatsapp' | 'phone' | 'support' | 'info' | 'form' | 'self-serve'
  responseTime: string
  actionLabel: string
  actionHref: string
  includeWhenContacting: string[]
}

export type ContactPageContent = {
  heroTitle: string
  heroDescription: string
  intents: ContactIntent[]
  slas: { label: string; value: string; detail: string }[]
  disputeSteps: { step: string; title: string; description: string }[]
  refundRules: { scenario: string; outcome: string }[]
  inquiryTypes: { value: string; label: string }[]
  selfServiceLinks: { label: string; href: string }[]
}

export type LegalSection = {
  id: string
  title: string
  paragraphs?: string[]
  list?: string[]
}

export type LegalPageContent = {
  updated: string
  description: string
  sections: LegalSection[]
}

export type LegalContent = {
  terms: LegalPageContent
  privacy: LegalPageContent
  disclaimer: LegalPageContent
}

export type InquiryPayload = {
  type: 'match' | 'contact'
  inquiryType?: string
  name?: string
  email?: string
  phone?: string
  service?: string
  neighborhood?: string
  message: string
}

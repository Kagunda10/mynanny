import type {
  AboutContent,
  ContactPageContent,
  LegalContent,
  MarketingContent,
  TimelineItem,
} from '@/lib/cms-types'
import {
  ABOUT,
  DISCLAIMER_SECTIONS,
  PRIVACY_SECTIONS,
  TERMS_SECTIONS,
} from '@/lib/site-content'
import {
  CONTACT_INTENTS,
  CONTACT_SLAS,
  DISPUTE_STEPS,
  INQUIRY_TYPES,
  REFUND_RULES,
  SELF_SERVICE_LINKS,
} from '@/lib/contact-content'

export const DEFAULT_MARKETING: MarketingContent = {
  vetting: {
    title: 'Our Rigorous Vetting Process',
    passRate: 'Only 43% of applicants pass.',
    steps: [
      { icon: 'document_scanner', title: 'ID Verification', description: 'Biometric ID & Document cross-match.' },
      { icon: 'gavel', title: 'Criminal Check', description: 'Police Clearance & Interpol checks.' },
      { icon: 'verified_user', title: 'Live Onboarding', description: 'Final face-to-face service training.', isFinal: true },
    ],
  },
  hireSteps: {
    title: 'Hire in four taps.',
    description:
      'Our mobile-first platform is designed for the modern Nairobi professional. No lengthy meetings, just results.',
    ctaText: 'Get Started Now',
    ctaHref: '#match-form',
    steps: [
      { number: '1', title: 'Pick your service', description: 'Nanny, Cleaning, or Specialty Care.', stickyTop: '100px' },
      { number: '2', title: 'View matched profiles', description: 'See trust score, skills, and vetting status.', stickyTop: '140px' },
      { number: '3', title: 'Interviews arranged via video calls or direct voice calls', description: 'Speak directly with candidates before you hire.', stickyTop: '180px' },
      { number: '4', title: 'Secure & Onboard', description: 'Pay the placement fee via M-Pesa & start.', stickyTop: '220px', isFinal: true },
    ],
  },
  comparison: {
    title: 'Why parents choose us over bureaus',
    columns: [
      { label: 'Word of Mouth', note: 'Zero vetting', variant: 'negative' },
      { label: 'Traditional Bureau', note: 'Slow & paper-based', variant: 'negative' },
      { label: 'Mynanny', note: 'Vetted & Instant', variant: 'highlighted' },
    ],
  },
  appCta: {
    title: 'Manage your home from anywhere.',
    description:
      'Book sessions, chat with your help, and process payments in seconds with the Mynanny App.',
    image:
      '/images/remote/9dd8be1411c5.jpg',
  },
  matchForm: {
    title: "Let's find your perfect match.",
    description: "Tell us about your home and we'll send you 3 curated profiles by morning.",
    benefits: ['No obligation to hire', 'Response within 4 hours'],
    serviceOptions: ['Full-time Dayburg Nanny', 'Full-time Live-in Nanny', 'Deep Cleaning'],
    successMessage: 'Thank you! We will send your matches within 4 hours.',
  },
}

export const DEFAULT_ABOUT: AboutContent = {
  heroTitle: 'Our mission is to bring trust back to Nairobi homes.',
  heroImage:
    '/images/remote/19f499224ff1.jpg',
  originStory: ABOUT.origin,
  bodyStory: ABOUT.body,
  storyImage:
    '/images/remote/091e2661e457.jpg',
  mission: ABOUT.mission,
  vision: ABOUT.vision,
  values: ABOUT.whyChoose.map((v) => ({ title: v.title, description: v.description })),
  impactStats: [
    { value: 360, suffix: '', label: 'Families Protected', color: 'primary' },
    { value: 600, suffix: '+', label: 'Workers Empowered', color: 'secondary' },
    { value: 98, suffix: '%', label: 'Retention Rate', color: 'tertiary' },
  ],
  ctaTitle: 'Be part of the story.',
  ctaDescription:
    'Whether you are a family seeking the best care or a professional looking for a community that values you, there\'s a place for you here.',
}

export const DEFAULT_TIMELINE: TimelineItem[] = [
  {
    year: '2024',
    title: 'Started Operating',
    description: 'Started operating to connect Kenyan families with vetted domestic professionals.',
    image:
      '/images/remote/40988df5aacc.jpg',
  },
  {
    year: '2025',
    title: '360 Homes',
    description: 'Reached the milestone of serving 360 families across Kenya.',
    image:
      '/images/remote/3bff0039a6e0.jpg',
  },
  {
    year: '2026',
    title: 'Empowerment',
    description: 'Highly regarded in Nairobi and its environs for trusted domestic care.',
    image:
      '/images/remote/402c8f4b4030.jpg',
  },
]

export const DEFAULT_CONTACT_PAGE: ContactPageContent = {
  heroTitle: 'Talk to the right team, fast.',
  heroDescription:
    'Choose what you need help with below. We route hiring to WhatsApp, payments to support, and disputes to our review team within 24 hours.',
  intents: CONTACT_INTENTS,
  slas: CONTACT_SLAS.map((s) => ({ label: s.label, value: s.value, detail: s.detail })),
  disputeSteps: DISPUTE_STEPS.map((s) => ({ step: s.step, title: s.title, description: s.description })),
  refundRules: REFUND_RULES.map((r) => ({ scenario: r.scenario, outcome: r.outcome })),
  inquiryTypes: INQUIRY_TYPES.map((t) => ({ value: t.value, label: t.label })),
  selfServiceLinks: SELF_SERVICE_LINKS.map((l) => ({ label: l.label, href: l.href })),
}

export const DEFAULT_LEGAL: LegalContent = {
  terms: {
    updated: 'July 2026',
    description: 'Rules for using the Mynanny website and mobile app.',
    sections: TERMS_SECTIONS,
  },
  privacy: {
    updated: 'July 2026',
    description: 'How we collect, use, and protect your personal information.',
    sections: PRIVACY_SECTIONS,
  },
  disclaimer: {
    updated: 'July 2026',
    description: 'Limitations on information provided on this website.',
    sections: DISCLAIMER_SECTIONS,
  },
}

function mapLegalSections(
  sections?: { id?: string; title?: string; paragraphs?: { paragraph?: string }[]; list?: { item?: string }[] }[],
) {
  if (!sections?.length) return []
  return sections.map((s) => ({
    id: s.id ?? '',
    title: s.title ?? '',
    paragraphs: s.paragraphs?.map((p) => p.paragraph ?? '').filter(Boolean),
    list: s.list?.map((l) => l.item ?? '').filter(Boolean),
  }))
}

export { mapLegalSections }

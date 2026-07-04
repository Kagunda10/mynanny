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
      { icon: 'psychology', title: 'Psych Test', description: 'Assessing temperament and ethics.' },
      { icon: 'medical_information', title: 'Medical Exam', description: 'Comprehensive fitness-for-duty clearance.' },
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
      { number: '2', title: 'View matched profiles', description: 'See ratings, skills, and vetting status.', stickyTop: '140px' },
      { number: '3', title: 'Interview via App', description: 'Video call or chat directly with candidates.', stickyTop: '180px' },
      { number: '4', title: 'Secure & Onboard', description: 'Pay the placement fee via M-Pesa & start.', stickyTop: '220px', isFinal: true },
    ],
  },
  comparison: {
    title: 'Why parents choose us over bureaus',
    columns: [
      { label: 'Word of Mouth', note: 'Zero vetting', variant: 'negative' },
      { label: 'Traditional Bureau', note: 'Slow & paper-based', variant: 'negative' },
      { label: 'MyNanny', note: 'Vetted & Instant', variant: 'highlighted' },
    ],
  },
  appCta: {
    title: 'Manage your home from anywhere.',
    description:
      'Book sessions, chat with your help, and process payments in seconds with the MyNanny App.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfMnuARG3BvDHpO12PlXBlKcUwmM4_Fek8pfg1gSnITTBz4CZVdKPPURRanv7JO21VD3ppR8h8zidTjxAXtqxptsJeuBU26l_LQAirUHJUy8V8JH5rofily4xJtsN1eJdDLs7hYt1efNCIHMoNlbCtnzY3DU9lQRqBHgIa2vMB2Nz4wBzLaz9MtFE6Y1Wh0u-P6hAcEQr9CtiwvdIaxr_yi70Xo5OQGfCnV0XBXlTvzNpPrC87-edPJg',
  },
  matchForm: {
    title: "Let's find your perfect match.",
    description: "Tell us about your home and we'll send you 3 curated profiles by morning.",
    benefits: ['No obligation to hire', 'Response within 4 hours', 'Free trial day included'],
    serviceOptions: ['Full-time Nanny', 'Deep Cleaning', 'Part-time Housekeeper'],
    successMessage: 'Thank you! We will send your matches within 4 hours.',
  },
}

export const DEFAULT_ABOUT: AboutContent = {
  heroTitle: 'Our mission is to bring trust back to Nairobi homes.',
  heroImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD3DVn51M8Ksl8kdGuHjojwFVLXdvGyDbE-WNiv64Kt-FjNNAOEpq8T6cxLWZt75okLetaWNyiFcWVcHy-IpwEJBl_f7mg5a232ks9FZOXmQ_-AZ0DdnuK4KHOHee4DKRiU0KulaRNGVQ_cKHjqud9vwa3Ln6IKZId2h57TjEJn8mBpoY_KOtsiUNWK-ayFMi6XWIBc4b82ajPIcg0eHAVq22_XF6f74k-2n3b_SY8M8FxMU3qM2MWOXA',
  originStory: ABOUT.origin,
  bodyStory: ABOUT.body,
  storyImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9h25nJsb3beHKOs1kLs-qLxgglKSLkfsOZogyDo0hUHQQrSSqRemldKbkPHk0x1ulnEmH89ttDPRL618xOGA2gfCJHEvpxNy0lhYdyYK_tkuObwlBLZmZ7QbzMi0ZDjclGBsij7nJJjnYHtVAtjKdZoqHKj9TdsDm5G0ZphJU2CEWHbd0zdGsXtKbzLNEmLCaurvBUO7LmvJA0UK4CUMDVRKFklGLaOpfV51X-g6oe26BIqVMTKWgrg',
  mission: ABOUT.mission,
  vision: ABOUT.vision,
  values: ABOUT.whyChoose.map((v) => ({ title: v.title, description: v.description })),
  impactStats: [
    { value: 5000, suffix: '+', label: 'Families Protected', color: 'primary' },
    { value: 1200, suffix: '+', label: 'Workers Empowered', color: 'secondary' },
    { value: 98, suffix: '%', label: 'Retention Rate', color: 'tertiary' },
  ],
  ctaTitle: 'Be part of the story.',
  ctaDescription:
    'Whether you are a family seeking the best care or a professional looking for a community that values you, there\'s a place for you here.',
}

export const DEFAULT_TIMELINE: TimelineItem[] = [
  {
    year: '2019',
    title: 'The Seed',
    description: 'Founded in a small Westlands apartment with a team of three and a vision for safety.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwSvv3Wu-XHjaZUsdFNqia8UbhBOguzGV5dOT8DzgOU_42LOWJJF6Qac0JDdba_gX3GGFKTR2KxVhqSRDnSU6ZgTMzpjPYtY0Y27_f4qYZ8sAVxVpuUzWmSGSjIlBTwhl8-me4kxpDGuM71NfRs3iQuqbJkfGPdyVFZ_RJGr8mFU1pey7cHu4_sd8dT9dq2zvRncvruQrOG4gkO2Qa8KlDRbrfeLEmGYwwaTRKZgviCE1OGdhbokk6ow',
  },
  {
    year: '2021',
    title: '1,000 Homes',
    description: 'Reached the milestone of serving 1,000 families across the Nairobi metropolitan area.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSAFyNosF8uIrImL1rVClgAWQSIkCe4bxWj8L1ro5n4Yn4VzjnEXzde9Jlrq6eUxQdbSjvIeT4A6l20bWKr2jbeqsW8AtegLgE9jvgF2lIPjwF4H1Za87vV531NS-DpUhRT75UJZs75yK7DPPSOoLortBjYz87qUusb9BaZ99iIh781Xxhe-a1fwiodIjOVWYBzUFQAkllFZzkxJZOrdBNNmAeaRoqo3YOmatN_OYjCTWLJZBRfXJYBQ',
  },
  {
    year: '2023',
    title: 'Vetting Lab',
    description: 'Launched our proprietary 12-step verification system including AI-backed background checks.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBocsgWPI_gkZ-SFbt7rlHQi6xHelfH3EKECdvApOi0_4ZMe9SN7-qnFg6t-iBl3xzlD0s6LTGRCQtQBZa7WSB1BB91plsz7bFlO2v_ck0CEH6_ZTUiPLPNAaP1QAkJGOxxde4gMUytOF8lbygFDKEs_ZNT17eHE-DQDa0Lj2I_5TUzwhoyRJnUvAm-lCa6EMfdCAJDj6MKpZ2abHyrwzo-ki8w99xMxRU8qi5pyyE7Rnlpj0vb_zb7aQ',
  },
  {
    year: '2024',
    title: 'Empowerment',
    description: 'Voted as the #1 platform for domestic worker rights and fair compensation in East Africa.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_l46SgdE0CNZTRsYQQQ976e86MoY16sK3oDJ-JxxQXCulvegERv9HrU2WAEUqURnHdaYZNkgkGxCA_p44ks1FyBHcci2fFcS5Bvaweg4S6mXcxbbU_Tht6M4-3iMF83mPOP0YZ3LXwJzFJOt-5vvq5GmAVZQbRoBklF8pW6ooS8EtD9Diei_kQLFi1EdGkm4B5ei18Rs9Qjd8mLmz9x6z_7IVVesTKZ-ZFKaeMbQ2VRNgDLq1D4QJw',
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
    description: 'Rules for using the MyNanny website and mobile app.',
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

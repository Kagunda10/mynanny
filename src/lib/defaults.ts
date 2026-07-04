import type {
  ArticlePreview,
  CoverageContent,
  FaqItem,
  HomepageContent,
  PricingContent,
  ServiceCard,
  SiteSettingsContent,
  TestimonialReview,
} from '@/lib/cms-types'
import { COMPANY } from '@/lib/site-content'

export const DEFAULT_HOMEPAGE: HomepageContent = {
  heroEyebrow: 'Most trusted in Nairobi',
  heroHeadline: 'Find domestic help you can trust.',
  heroSubheadline:
    'Skip the bureaus. We provide vetted, background-checked domestic professionals for Kilimani, Lavington, and the wider Nairobi area.',
  heroCtaText: 'Get Matched Free',
  heroCtaUrl: '#match-form',
  heroImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBsvOyGgG_ubTJGnDtltgD1mUj_8tgY8oKdfyNzIYe2IqtP3iu9IWRR8XQeT7dS-A_UNWd3KqB781YTv5BiJelKVEU2scTOj3TuT5M_crAy9rUOH_VwqcHVxSR24CF_UvXzaBcd1ympCmpVm6qN1I9UXZb1a5CJ5_zPEbcCPMybGj2knoyEv1sWUsm79jLhkfRrzgewyeUQXsFyGbzAsIM2BPiDfbJBSHCYBfhSQXVBuQh0au4AqF_eCw',
  stats: [
    { label: 'Vetted Workers', value: '2,340+', numericTarget: 2340, suffix: '+' },
    { label: 'User Rating', value: '4.8', numericTarget: 4.8 },
  ],
  activityMessages: [
    'Grace W. was hired as a live-in nanny in Lavington - 2 hrs ago',
    'Mercy K. completed a deep clean in Kilimani - 45 mins ago',
    '3 new vetted cleaners joined in Westlands - Just now',
    'David M. was hired for elderly care in Karen - 5 hrs ago',
    'Success! 12 homes cleaned today in Kileleshwa - Ongoing',
  ],
  marqueeNeighborhoods: [
    'Kilimani',
    'Lavington',
    'Westlands',
    'Karen',
    'Runda',
    'Parklands',
    'Kileleshwa',
    'Muthaiga',
  ],
  marqueeServices: [
    'Deep Cleaning',
    'Live-in Nanny',
    'Same-day Cleaner',
    'Elderly Care',
    'Chef & Meal Prep',
  ],
  aggregateRating: 4.8,
  reviewCount: 450,
}

export const DEFAULT_PRICING: PricingContent = {
  tableRows: [
    { service: 'One-time Deep Clean', bookingFee: 'Ksh 1,200', rate: 'From Ksh 3,500' },
    { service: 'Part-time Housekeeper', bookingFee: 'Ksh 4,500', rate: 'Ksh 1,500 / day' },
    { service: 'Full-time Live-in Nanny', bookingFee: 'Ksh 8,000', rate: 'Negotiable (Est. 15k-25k)' },
  ],
  rolePricing: [
    {
      role: 'Live-in nanny',
      low: 18000,
      high: 35000,
      period: '/month',
      note: 'Depends on experience and duties',
      details:
        'Full-time childcare with accommodation. Includes meals, day off per week. Salary varies by child count, ages, and additional duties like cooking or tutoring.',
      popular: true,
    },
    {
      role: 'Day nanny',
      low: 12000,
      high: 25000,
      period: '/month',
      note: '6am - 6pm weekday coverage',
      details:
        'Daytime childcare without accommodation. Standard hours are 6am to 6pm, Monday through Friday. Overtime rates apply for weekends.',
    },
    {
      role: 'Housekeeper',
      low: 10000,
      high: 20000,
      period: '/month',
      note: 'Cleaning, laundry, cooking',
      details:
        'General house management including cleaning, laundry, ironing, and basic cooking. Some families combine this with light childcare for older children.',
    },
    {
      role: 'Caregiver',
      low: 20000,
      high: 40000,
      period: '/month',
      note: 'Elderly or post-recovery care',
      details:
        'Specialized care for elderly family members or post-surgery recovery. Requires first-aid certification. Night shift and live-in options available.',
    },
    {
      role: 'Deep clean (3BR)',
      low: 4500,
      high: 8000,
      period: '/session',
      note: 'Crew of 2-3, equipment included',
      details:
        'Professional team arrives with all equipment and supplies. Includes kitchen deep clean, bathroom sanitization, floor scrubbing, window cleaning, and furniture dusting. Larger homes priced per room.',
    },
    {
      role: 'Gardener',
      low: 8000,
      high: 15000,
      period: '/month',
      note: 'Weekly visits, compound maintenance',
      details:
        'Weekly maintenance visits covering lawn mowing, hedge trimming, flower bed care, and compound cleaning. Larger compounds or daily visits priced separately.',
    },
  ],
  feeBreakdown: [
    { label: 'Browsing and matching', value: 'Free', type: 'free' },
    { label: 'Profile viewing', value: 'Free', type: 'free' },
    { label: 'Reference calls', value: 'Free', type: 'free' },
    { label: 'Placement fee (one-time)', value: '50% of first month salary', type: 'fee' },
    { label: 'Monthly payments after', value: 'Direct to worker via M-Pesa', type: 'direct' },
    { label: 'Replacement guarantee', value: '14 days, no extra charge', type: 'free' },
  ],
  lastUpdated: 'June - July 2026',
}

export const DEFAULT_COVERAGE: CoverageContent = {
  location: {
    regionLabel: 'Greater Nairobi',
    centerLat: -1.2864,
    centerLng: 36.8172,
    zoom: 11,
  },
  section: {
    eyebrow: 'Nairobi coverage',
    title: 'Workers near every Nairobi home.',
    subtitle:
      'Tap a neighborhood to see how many vetted workers are active nearby. We match you with people who already know your area.',
  },
  neighborhoods: [
    { name: 'Kilimani', workers: 186, latitude: -1.2921, longitude: 36.782, popular: ['Nannies', 'Housekeepers'] },
    { name: 'Lavington', workers: 142, latitude: -1.28, longitude: 36.767, popular: ['Live-in Nannies', 'Gardeners'] },
    { name: 'Westlands', workers: 203, latitude: -1.2674, longitude: 36.807, popular: ['Housekeepers', 'Deep cleaning'] },
    { name: 'Karen', workers: 124, latitude: -1.3197, longitude: 36.707, popular: ['Live-in Nannies', 'Gardeners'] },
    { name: 'Runda', workers: 67, latitude: -1.2145, longitude: 36.806, popular: ['Nannies', 'Caregivers'] },
    { name: 'Kileleshwa', workers: 158, latitude: -1.283, longitude: 36.778, popular: ['Day Nannies', 'Cleaners'] },
    { name: 'South B', workers: 94, latitude: -1.313, longitude: 36.845, popular: ['Housekeepers', 'Deep cleaning'] },
    { name: 'South C', workers: 87, latitude: -1.303, longitude: 36.829, popular: ['Cleaners', 'Housekeepers'] },
    { name: 'Syokimau', workers: 73, latitude: -1.348, longitude: 36.928, popular: ['Housekeepers', 'Deep cleaning'] },
    { name: 'Ruaka', workers: 112, latitude: -1.204, longitude: 36.765, popular: ['Nannies', 'Housekeepers'] },
    { name: 'Parklands', workers: 131, latitude: -1.263, longitude: 36.815, popular: ['Caregivers', 'Housekeepers'] },
    { name: 'Langata', workers: 98, latitude: -1.35, longitude: 36.768, popular: ['Gardeners', 'Nannies'] },
  ],
  totalWorkers: 1475,
  avgMatchHours: 48,
}

export const DEFAULT_TESTIMONIALS: TestimonialReview[] = [
  {
    rating: 5,
    body: '"Found a wonderful nanny within 48 hours. The vetting report gave me so much peace of mind. Highly recommend to any busy parent in Kilimani."',
    initials: 'WM',
    name: 'Wanjiru M.',
    location: 'Verified Client',
    color: 'bg-primary-fixed text-primary',
  },
  {
    rating: 4,
    body: '"Process was smooth. Initial candidate had some paperwork delays but Mynanny sorted it out quickly. Excellent customer service."',
    initials: 'DO',
    name: 'Daniel O.',
    location: 'Lavington',
    color: 'bg-secondary-fixed text-secondary',
    reply: 'Thanks Daniel! We pride ourselves on fixing hiccups promptly. Glad you liked the service.',
  },
  {
    rating: 5,
    body: '"The deep cleaning was incredible. They even cleaned the window tracks! Worth every shilling."',
    initials: 'SA',
    name: 'Sarah A.',
    location: 'Westlands',
    color: 'bg-tertiary-fixed text-tertiary',
  },
]

export const DEFAULT_HOME_FAQ: FaqItem[] = [
  {
    question: 'How do you verify the Police Clearance (Good Conduct)?',
    answer:
      'We use the e-Citizen portal to verify the authenticity of all Police Clearance Certificates. Additionally, we conduct a fingerprint-based background check through our security partners to ensure no records have been omitted.',
  },
  {
    question: 'What happens if a worker gets sick or leaves?',
    answer:
      'We provide a 90-day free replacement guarantee. If a placement does not work out for any reason, we will match you with a new professional at no additional placement cost.',
  },
  {
    question: 'Do I pay the nanny through the app?',
    answer:
      'You can choose. We offer a payroll management service that handles M-Pesa payments, NHIF, and NSSF filings for you, or you can pay the worker directly according to your private agreement.',
  },
]

export const DEFAULT_PRICING_FAQ: FaqItem[] = [
  {
    question: 'What is the placement fee?',
    answer:
      "Browsing and matching are free. When you hire, you pay a one-time placement fee of 50% of the worker's first month salary via M-Pesa. After that, monthly salary goes direct to the worker.",
  },
  {
    question: 'Are salary ranges fixed?',
    answer:
      'Ranges reflect actual Nairobi placements and update monthly. Final salary depends on experience, duties, child count, and your neighbourhood.',
  },
  {
    question: 'What if the placement does not work out?',
    answer:
      'We include a 14-day replacement guarantee at no extra placement charge. For longer-term peace of mind, our standard replacement policy covers 90 days after hire.',
  },
  {
    question: 'When is nanny contact information shared?',
    answer:
      'For home nanny services, worker contact details are released only after your placement fee payment is confirmed. This protects both families and professionals.',
  },
  {
    question: 'How do cancellations and refunds work?',
    answer:
      'If a job seeker no-shows or cancels before start, you receive a full refund. Employer cancellations within 24 hours of start receive a 50% refund. See our Terms for full details.',
  },
]

export const DEFAULT_HOW_IT_WORKS_FAQ: FaqItem[] = [
  ...DEFAULT_HOME_FAQ,
  {
    question: 'How long does vetting take?',
    answer:
      'Most candidates complete our five-step integrity engine within 7 to 10 business days. ID verification and police clearance are checked before a profile goes live.',
  },
  {
    question: 'What is the trial period shield?',
    answer:
      'Every placement includes a supervised trial period with check-ins from our team. If the fit is not right, we activate our replacement guarantee at no extra placement fee.',
  },
]

export const DEFAULT_SITE_SETTINGS: SiteSettingsContent = {
  siteName: COMPANY.name,
  tagline: COMPANY.tagline,
  footerBlurb:
    'We assemble professionals in the domestic service space to give you the best domestic help in Nairobi. Exceptional experience, friendly professionals, first-class customer service.',
  phone: COMPANY.phones[0],
  email: COMPANY.email,
  whatsapp: COMPANY.whatsapp,
  address: COMPANY.location,
  navItems: [
    { label: 'How it Works', href: '/why-mynanny' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'For Workers', href: '/join' },
  ],
  footerColumns: [
    {
      title: 'Platform',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'How it Works', href: '/why-mynanny' },
        { label: 'Our Services', href: '/services' },
        { label: 'Join as Nanny', href: '/join' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Pricing', href: '/pricing' },
        { label: 'Guides', href: '/guides' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Book a Service', href: COMPANY.appUrl },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'Delete Account', href: '/delete-account' },
      ],
    },
  ],
  socialLinks: [
    { platform: 'Instagram', url: COMPANY.social.instagram },
    { platform: 'Twitter', url: COMPANY.social.twitter },
    { platform: 'Facebook', url: COMPANY.social.facebook },
    { platform: 'LinkedIn', url: COMPANY.social.linkedin },
  ],
}

export const DEFAULT_SERVICES: ServiceCard[] = [
  {
    name: 'Nanny Services',
    slug: 'nanny-services',
    description:
      'Full-day or part-time childcare from vetted, trained nannies. First-aid certified and background-checked.',
    icon: 'child_care',
    basePrice: 4500,
    unit: 'Per Day',
    popular: true,
    tag: 'Most Popular',
    tagColor: 'bg-brand-pink text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXFJ9XS89vtYtU60o8tCLzltBtY966RzRuVNFi0InIqurRjhEvRbKntQrj2AaIv6UoaR51SLEiKUv4WavRVeFi3rz1oGEOs2osN17dhjYIDEm80FAQ4z4rGIXH7AaywS1bK7PfcKlHoeELNQjhpn5J4WNxt6aQ4KcpEptnnE3UF1hPkZr93we30nQDBhJp11uTQiW9P4PbGyNjnTMEeXuwuCsbqas_8RyeYoi2wR5kmKaHvMYUKnSjNQ',
  },
  {
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    description:
      'Top-to-bottom scrub of your home — kitchens, bathrooms, windows and upholstery. Eco-friendly products included.',
    icon: 'sanitizer',
    basePrice: 6000,
    unit: 'Flat Rate',
    popular: true,
    tag: 'Premium',
    tagColor: 'bg-secondary text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUh5rwok4xvFAYCfQji6uX76khNqk_sxy5tqHMasVkocrxqTEp8_lUUrcpDUq3L5t8wykNsyepQqPyZgj-Xh4Lv1BcES6K3rWX-B_D697nw4Sx52Y4c_YCnr-MZxoA2tIpKEFKWu1U3xpZAYATxEUkPfQa1mZbaqyPsFN1sYD2cOuBanu4gVwraqd4I4mIFLCt35AtRJIMzwnrRcQ8WY07gM8kOytWrbAvFUz9R46Cnqt_rx_RSh_leQ',
  },
  {
    name: 'Elderly Care',
    slug: 'elderly-care',
    description:
      'Trained companions for your elderly loved ones — medication reminders, light housekeeping, and warm company.',
    icon: 'elderly',
    basePrice: 5500,
    unit: 'Per Shift',
    popular: false,
    tag: 'Compassionate',
    tagColor: 'bg-tertiary text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUAkTmk04Z5f4XqQVXGxJGslD5twGCTQHXCID7lf4gmQdMuo2bR0q2xaTleZuPHU1XinlwN-RyVKkEqHBjcy6uz7IBIPjSZZbwjgbPnTychsEAFO4gBPyaiEAc_Mr1CINKUyiCQbL87IOL44W10A9gKeB4Y9saIX43CoKW-_AHcY7ecFAhfxiWJGMFU_cojBHNi3LrprXrjhYCBLlHItHtoJwq4hk2VzzmZdvHpTKil6JK8aGSX62EuA',
  },
]

export const DEFAULT_ARTICLES: ArticlePreview[] = [
  {
    slug: 'nanny-costs-in-nairobi-2026',
    title: 'What does a nanny cost in Nairobi in 2026?',
    excerpt:
      "An exhaustive breakdown of current market rates, NHIF/NSSF requirements, and why the 'live-in' vs 'live-out' gap is widening.",
    category: 'Pricing',
    readTime: '8 min read',
    featured: true,
    author: 'Wanjiku Maina',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAr17RIgft-IyaMcgnJExnJnulLVG78biOB2JKtGGr1Gt71DoK6Say3Ri6id9WuhvMHYZBIzeR4jQqnkueIpNFI-aYBnjYZyaWDIn-16tbGoMe1sqrAuscKPxVQxLSxEjFugtBkQSPpz0PV4-Y36e4trtaw__fFvD4DX4ITKaSqSLH0LzEc3uspXk6J3ZDzQ53wyAF744iuM8tE2jXhmD9KmXUs0N3yAAifUmDfp-Vmhqj01S6wovFM_w',
  },
  {
    slug: 'nhif-nssf-guide-nairobi-homeowners',
    title: 'NHIF & NSSF: A Guide for Nairobi Homeowners',
    excerpt: 'Stay compliant with the latest Ministry of Labour guidelines for domestic workers.',
    category: 'Legal',
    readTime: '6 min read',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7XVoCr7oAjY5THg6dnykSPIBS-X0j1kpU-hjtAqGOCgo_qi-hnfqfaqZVCxuXbK88GCisal_Mw6iEmRekxQ5VeopII5eBKKNTvGV27ptNF-2uautp5X1TW0SYLeujGChQqbxC_zewxO7_JhnJWB0BPf511dLTefWkcqUmVxdv8FvKtwHPYn3ILyKP8tRNcJ9FujyoaE-ttIzyZDI3Rrq1FMRrrJZnQc5sNGSOVcQoEpPxKw1kWQtWJw',
  },
  {
    slug: 'ultimate-deep-cleaning-checklist',
    title: 'The Ultimate Deep Cleaning Checklist',
    excerpt: 'The exact 48 points our professionals check to ensure your home is truly clean.',
    category: 'Maintenance',
    readTime: '5 min read',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCz9qjJEm8k78bPtzETnqhE-rg26brX50w0wJUeeg9tJfB2aWhT9HHJB2h-G5I6MsKnPmQ0BriMCXXSty2CENhsh_KagjNCfkDFHiMBs3NIO6zoY5pcT1UwoiWQR1_6iFHXfL4jN-KbsKtipY5KEtZr1gj885vWW6xum6L9QzXsLchtZdQcX9eYi8AEFOdEsawYXPCZ7Vem9L9LFF5Okynvf3zwGOVc_5IDC5DftSMqpa0X5Rkh_weNXg',
  },
]

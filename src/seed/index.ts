// @ts-nocheck
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  DEFAULT_ABOUT,
  DEFAULT_CONTACT_PAGE,
  DEFAULT_LEGAL,
  DEFAULT_MARKETING,
  DEFAULT_TIMELINE,
} from '../lib/extended-defaults'

function mapLegalSectionsForSeed(sections) {
  return sections.map((s) => ({
    id: s.id,
    title: s.title,
    paragraphs: s.paragraphs?.map((paragraph) => ({ paragraph })) ?? [],
    list: s.list?.map((item) => ({ item })) ?? [],
  }))
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@mynanny.co.ke',
        password: 'changeme123',
        name: 'Admin',
      },
    })
    console.log('✅ Admin user created')
  } catch {
    console.log('⏭️  Admin user already exists')
  }

  const faqs = [
    {
      question: 'How do you verify the Police Clearance (Good Conduct)?',
      answer:
        'We use the e-Citizen portal to verify the authenticity of all Police Clearance Certificates.',
      pages: ['home', 'how-it-works'],
      order: 1,
    },
    {
      question: 'What happens if a worker gets sick or leaves?',
      answer:
        "We provide a 60-day free replacement guarantee. If a placement doesn't work out for any reason, we will match you with a new professional at no additional placement cost.",
      pages: ['home', 'how-it-works'],
      order: 2,
    },
    {
      question: 'Do I pay the nanny through the app?',
      answer:
        'You can choose! We offer a payroll management service that handles M-Pesa payments, NHIF, and NSSF filings for you, or you can pay the worker directly according to your private agreement.',
      pages: ['home', 'how-it-works'],
      order: 3,
    },
    {
      question: 'How long does vetting take?',
      answer:
        'Most candidates complete our integrity engine within 7 to 10 business days. ID verification and police clearance are checked before a profile goes live.',
      pages: ['how-it-works'],
      order: 4,
    },
    {
      question: 'What is the placement fee?',
      answer:
        "Browsing and matching are free. When you hire, you pay a one-time placement fee of 50% of the worker's first month salary via M-Pesa. After that, monthly salary goes direct to the worker.",
      pages: ['pricing'],
      order: 1,
    },
    {
      question: 'Are salary ranges fixed?',
      answer:
        'Ranges reflect actual Nairobi placements and update monthly. Final salary depends on experience, duties, child count, and your neighbourhood.',
      pages: ['pricing'],
      order: 2,
    },
    {
      question: 'What if the placement does not work out?',
      answer:
        'We include a 14-day replacement guarantee at no extra placement charge. For longer-term peace of mind, our standard replacement policy covers 60 days after hire.',
      pages: ['pricing'],
      order: 3,
    },
    {
      question: 'When is nanny contact information shared?',
      answer:
        'For home nanny services, worker contact details are released only after your placement fee payment is confirmed. This protects both families and professionals.',
      pages: ['pricing'],
      order: 4,
    },
    {
      question: 'How do cancellations and refunds work?',
      answer:
        'If a job seeker no-shows or cancels before start, you receive a full refund. Employer cancellations within 24 hours of start receive a 50% refund. See our Terms for full details.',
      pages: ['pricing'],
      order: 5,
    },
  ]

  for (const faq of faqs) {
    try {
      await payload.create({
        collection: 'faq',
        data: faq as {
          question: string
          answer: string
          pages: ('home' | 'pricing' | 'how-it-works' | 'general')[]
          order: number
        },
      })
    } catch {
      /* may already exist */
    }
  }
  console.log('✅ FAQ seeded')

  const testimonials = [
    {
      clientName: 'Wanjiru M.',
      initials: 'WM',
      location: 'Verified Client',
      quote:
        'Found a wonderful nanny within 48 hours. The vetting report gave me so much peace of mind. Highly recommend to any busy parent in Kilimani.',
      rating: 5,
      colorVariant: 'primary',
      featured: true,
      order: 1,
    },
    {
      clientName: 'Daniel O.',
      initials: 'DO',
      location: 'Lavington',
      quote:
        'Process was smooth. Initial candidate had some paperwork delays but Mynanny sorted it out quickly. Excellent customer service.',
      rating: 4,
      colorVariant: 'secondary',
      ownerReply:
        'Thanks Daniel! We pride ourselves on fixing hiccups promptly. Glad you liked the service.',
      featured: true,
      order: 2,
    },
    {
      clientName: 'Sarah A.',
      initials: 'SA',
      location: 'Westlands',
      quote: 'The deep cleaning was incredible. They even cleaned the window tracks! Worth every shilling.',
      rating: 5,
      colorVariant: 'tertiary',
      featured: true,
      order: 3,
    },
    {
      clientName: 'David O.',
      initials: 'DO',
      location: 'Karen',
      quote:
        'Elderly care for my mother has been exceptional. The caregiver is patient, kind, and medically trained. A blessing.',
      rating: 5,
      colorVariant: 'primary',
      featured: true,
      order: 4,
    },
    {
      clientName: 'Amara K.',
      initials: 'AK',
      location: 'Runda',
      quote:
        "I've been through three bureaus before finding Mynanny. The difference is night and day. Professional, vetted, and reliable.",
      rating: 5,
      colorVariant: 'secondary',
      featured: true,
      order: 5,
    },
    {
      clientName: 'Wanjiku M.',
      initials: 'WM',
      location: 'Parklands',
      quote:
        "Our nanny has become part of the family. She's been with us 8 months and the kids adore her. Thank you Mynanny!",
      rating: 5,
      colorVariant: 'tertiary',
      featured: true,
      order: 6,
    },
  ]

  for (const t of testimonials) {
    try {
      await payload.create({ collection: 'testimonials', data: t })
    } catch {
      /* may already exist */
    }
  }
  console.log('✅ Testimonials seeded')

  const services = [
    {
      name: 'Nanny Services',
      slug: 'nanny-services',
      description:
        'Verified, background-checked, and child-safety trained professionals for your children. Full-time, part-time, or live-in options available.',
      icon: 'child_care',
      basePrice: 500,
      unit: 'Per Day / Per Month',
      popular: true,
      tag: 'Most Popular',
      tagColor: 'bg-brand-pink text-white',
      image:
        '/images/remote/d10fb909ca93.jpg',
      order: 1,
    },
    {
      name: 'Deep Cleaning',
      slug: 'deep-cleaning',
      description:
        'Comprehensive 48-point cleaning checklist for a spotless home. One-time or recurring schedules.',
      icon: 'sanitizer',
      basePrice: 6000,
      unit: 'Flat Rate',
      popular: true,
      tag: 'Premium',
      tagColor: 'bg-secondary text-white',
      image:
        '/images/remote/40ec751f600b.jpg',
      order: 2,
    },
    {
      name: 'Elderly Care',
      slug: 'elderly-care',
      description:
        'Compassionate assistance for your seniors. Trained in mobility support, medication management, and companionship.',
      icon: 'elderly',
      basePrice: 1200,
      unit: 'Per Day / Per Month',
      popular: false,
      tag: 'Compassionate',
      tagColor: 'bg-tertiary text-white',
      image:
        '/images/remote/2e4025a300f3.jpg',
      order: 3,
    },
  ]

  for (const s of services) {
    try {
      await payload.create({ collection: 'services', data: s })
    } catch {
      /* may already exist */
    }
  }
  console.log('✅ Services seeded')

  const articles = [
    {
      title: 'What does a nanny cost in Nairobi in 2026?',
      slug: 'nanny-costs-in-nairobi-2026',
      category: 'Pricing',
      excerpt:
        "An exhaustive breakdown of current market rates, NHIF/NSSF requirements, and why the 'live-in' vs 'live-out' gap is widening.",
      author: 'Sarah Wanjiku',
      readTime: '8 min read',
      featured: true,
      status: 'published',
      publishedAt: '2026-01-15',
      imageUrl:
        '/images/remote/c11e3b145456.jpg',
      body: 'Navigating the domestic services market in Nairobi has become increasingly complex. As we enter 2026, several factors have shifted the baseline for what constitutes a fair and competitive salary for professional nannies.\n\nEntry level roles typically range from KES 18,000 to 25,000 per month. Mid-tier nannies with verified references often earn KES 25,000 to 40,000. Specialized newborn or special-needs caregivers can command KES 45,000 or more.',
    },
    {
      title: 'NHIF & NSSF: A Guide for Nairobi Homeowners',
      slug: 'nhif-nssf-guide-nairobi-homeowners',
      category: 'Legal',
      excerpt: 'Stay compliant with the latest Ministry of Labour guidelines for domestic workers.',
      author: 'Mynanny Legal Team',
      readTime: '6 min read',
      status: 'published',
      publishedAt: '2024-09-15',
      imageUrl:
        '/images/remote/d90a84b3b53e.jpg',
      body: 'Stay compliant with the latest Ministry of Labour guidelines for domestic workers. Everything you need to know about registering your help for NHIF and NSSF.',
    },
    {
      title: 'The Ultimate Deep Cleaning Checklist',
      slug: 'ultimate-deep-cleaning-checklist',
      category: 'Maintenance',
      excerpt: 'The exact 48 points our professionals check to ensure your home is truly clean.',
      author: 'Cleaning Standards Team',
      readTime: '5 min read',
      status: 'published',
      publishedAt: '2024-08-20',
      imageUrl:
        '/images/remote/149c45406b15.jpg',
      body: 'The exact 48 points our professionals check to ensure your home is truly clean. Use this to hold any service accountable.',
    },
    {
      title: '5 Questions to Ask During a Nanny Interview',
      slug: '5-questions-nanny-interview',
      category: 'Interviews',
      excerpt: 'How to look beyond the CV and find the right personality for your family.',
      author: 'Sarah Njoki',
      readTime: '7 min read',
      status: 'published',
      publishedAt: '2024-07-10',
      imageUrl:
        '/images/remote/d6f3471f47d2.jpg',
      body: 'How to look beyond the CV and find the right personality for your family. Expert-backed interview framework for Nairobi parents.',
    },
  ]

  for (const a of articles) {
    try {
      await payload.create({ collection: 'articles', data: a })
    } catch {
      /* may already exist */
    }
  }
  console.log('✅ Articles seeded')

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      heroEyebrow: 'Most trusted in Kenya and beyond',
      heroHeadline: 'Find domestic help you can trust.',
      heroSubheadline:
        'Skip the bureaus. We provide vetted, background-checked domestic professionals for Kilimani, Lavington, and the wider Nairobi area.',
      heroCtaText: 'Get Matched Free',
      heroCtaUrl: '#match-form',
      heroImage:
        '/images/remote/391dd4d57347.jpg',
      stats: [
        { label: 'Vetted Workers', value: '2,340+', numericTarget: 2340, suffix: '+' },
        { label: 'User Rating', value: '4.8', numericTarget: 4.8 },
      ],
      activityMessages: [
        { message: 'Grace W. was hired as a live-in nanny in Lavington - 2 hrs ago' },
        { message: 'Mercy K. completed a deep clean in Kilimani - 45 mins ago' },
        { message: '3 new vetted cleaners joined in Westlands - Just now' },
        { message: 'David M. was hired for elderly care in Karen - 5 hrs ago' },
        { message: 'Success! 12 homes cleaned today in Kileleshwa - Ongoing' },
      ],
      marqueeNeighborhoods: [
        { name: 'Kilimani' },
        { name: 'Lavington' },
        { name: 'Westlands' },
        { name: 'Karen' },
        { name: 'Runda' },
        { name: 'Parklands' },
        { name: 'Kileleshwa' },
        { name: 'Muthaiga' },
      ],
      marqueeServices: [
        { name: 'Deep Cleaning' },
        { name: 'Live-in Nanny' },
        { name: 'Same-day Cleaner' },
        { name: 'Elderly Care' },
        { name: 'Chef & Meal Prep' },
      ],
      aggregateRating: 4.8,
      reviewCount: 450,
    },
  })
  console.log('✅ Homepage global seeded')

  await payload.updateGlobal({
    slug: 'pricing',
    data: {
      tableRows: [
        { service: 'One-time Deep Clean', bookingFee: 'Ksh 1,200', rate: 'From Ksh 3,500' },
        { service: 'Full-time Dayburg Nanny', bookingFee: 'Ksh 6,000', rate: 'Ksh 600 / day' },
        { service: 'Full-time Live-in Nanny', bookingFee: 'Ksh 6,000', rate: 'From Ksh 12,000' },
      ],
      rolePricing: [
        {
          role: 'Live-in nanny',
          low: 12000,
          period: '/month',
          note: 'Depends on experience and duties',
          details:
            'Full-time childcare with accommodation. Includes meals, day off per week. Salary varies by child count, ages, and additional duties like cooking or tutoring.',
          popular: true,
        },
        {
          role: 'Dayburg nanny',
          low: 15000,
          period: '/month',
          note: '6am - 6pm weekday coverage',
          details:
            'Dayburg childcare without accommodation. Standard hours are 6am to 6pm, Monday through Friday. Overtime rates apply for weekends.',
        },
        {
          role: 'Caregiver',
          low: 20000,
          high: 40000,
          period: '/month',
          note: 'Elderly or post-recovery care',
          details: 'Specialized care for elderly family members or post-surgery recovery.',
        },
        {
          role: 'Deep clean (3BR)',
          low: 4500,
          high: 8000,
          period: '/session',
          note: 'Crew of 2-3, equipment included',
          details: 'Professional team arrives with all equipment and supplies.',
        },
        {
          role: 'Gardener',
          low: 8000,
          high: 15000,
          period: '/month',
          note: 'Weekly visits, compound maintenance',
          details: 'Weekly maintenance visits covering lawn mowing, hedge trimming, and compound cleaning.',
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
    },
  })
  console.log('✅ Pricing global seeded')

  await payload.updateGlobal({
    slug: 'coverage',
    data: {
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
        { name: 'Kilimani', workers: 186, latitude: -1.2921, longitude: 36.782, popularServices: [{ service: 'Nannies' }, { service: 'Cleaners' }] },
        { name: 'Lavington', workers: 142, latitude: -1.28, longitude: 36.767, popularServices: [{ service: 'Live-in Nannies' }, { service: 'Gardeners' }] },
        { name: 'Westlands', workers: 203, latitude: -1.2674, longitude: 36.807, popularServices: [{ service: 'Cleaners' }, { service: 'Deep cleaning' }] },
        { name: 'Karen', workers: 124, latitude: -1.3197, longitude: 36.707, popularServices: [{ service: 'Live-in Nannies' }, { service: 'Gardeners' }] },
        { name: 'Runda', workers: 67, latitude: -1.2145, longitude: 36.806, popularServices: [{ service: 'Nannies' }, { service: 'Caregivers' }] },
        { name: 'Kileleshwa', workers: 158, latitude: -1.283, longitude: 36.778, popularServices: [{ service: 'Dayburg Nannies' }, { service: 'Cleaners' }] },
        { name: 'South B', workers: 94, latitude: -1.313, longitude: 36.845, popularServices: [{ service: 'Cleaners' }, { service: 'Deep cleaning' }] },
        { name: 'South C', workers: 87, latitude: -1.303, longitude: 36.829, popularServices: [{ service: 'Cleaners' }, { service: 'Nannies' }] },
        { name: 'Syokimau', workers: 73, latitude: -1.348, longitude: 36.928, popularServices: [{ service: 'Cleaners' }, { service: 'Deep cleaning' }] },
        { name: 'Ruaka', workers: 112, latitude: -1.204, longitude: 36.765, popularServices: [{ service: 'Nannies' }, { service: 'Cleaners' }] },
        { name: 'Parklands', workers: 131, latitude: -1.263, longitude: 36.815, popularServices: [{ service: 'Caregivers' }, { service: 'Cleaners' }] },
        { name: 'Langata', workers: 98, latitude: -1.35, longitude: 36.768, popularServices: [{ service: 'Gardeners' }, { service: 'Nannies' }] },
      ],
      totalWorkers: 1475,
      avgMatchHours: 48,
    },
  })
  console.log('✅ Coverage global seeded')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Mynanny',
      tagline: 'Cleaning & Domestic Services',
      footerBlurb:
        'We assemble professionals in the domestic service space to give you the best domestic help in Nairobi. Exceptional experience, friendly professionals, first-class customer service.',
      phone: '+254 726 378 444',
      email: 'info@mynanny.co.ke',
      whatsapp: '254726378444',
      address: 'Nairobi, Kenya',
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
            { label: 'Book a Service', href: 'https://web.mynanny.co.ke' },
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
        { platform: 'Instagram', url: 'https://www.instagram.com/mynanny_/' },
        { platform: 'Twitter', url: 'https://twitter.com/mynanny_ke' },
        { platform: 'Facebook', url: 'https://www.facebook.com/mynanny.ke/' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/mynannykenya/' },
      ],
    },
  })
  console.log('✅ Site settings seeded')

  await payload.updateGlobal({
    slug: 'marketing',
    data: {
      vetting: DEFAULT_MARKETING.vetting,
      hireSteps: DEFAULT_MARKETING.hireSteps,
      comparison: DEFAULT_MARKETING.comparison,
      appCta: DEFAULT_MARKETING.appCta,
      matchForm: {
        ...DEFAULT_MARKETING.matchForm,
        benefits: DEFAULT_MARKETING.matchForm.benefits.map((text) => ({ text })),
        serviceOptions: DEFAULT_MARKETING.matchForm.serviceOptions.map((label) => ({ label })),
      },
    },
  })
  console.log('✅ Marketing global seeded')

  await payload.updateGlobal({
    slug: 'about-page',
    data: DEFAULT_ABOUT,
  })
  console.log('✅ About page global seeded')

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      heroTitle: DEFAULT_CONTACT_PAGE.heroTitle,
      heroDescription: DEFAULT_CONTACT_PAGE.heroDescription,
      intents: DEFAULT_CONTACT_PAGE.intents.map((intent) => ({
        ...intent,
        includeWhenContacting: intent.includeWhenContacting.map((item) => ({ item })),
      })),
      slas: DEFAULT_CONTACT_PAGE.slas,
      disputeSteps: DEFAULT_CONTACT_PAGE.disputeSteps,
      refundRules: DEFAULT_CONTACT_PAGE.refundRules,
      inquiryTypes: DEFAULT_CONTACT_PAGE.inquiryTypes,
      selfServiceLinks: DEFAULT_CONTACT_PAGE.selfServiceLinks,
    },
  })
  console.log('✅ Contact page global seeded')

  await payload.updateGlobal({
    slug: 'legal',
    data: {
      terms: {
        ...DEFAULT_LEGAL.terms,
        sections: mapLegalSectionsForSeed(DEFAULT_LEGAL.terms.sections),
      },
      privacy: {
        ...DEFAULT_LEGAL.privacy,
        sections: mapLegalSectionsForSeed(DEFAULT_LEGAL.privacy.sections),
      },
      disclaimer: {
        ...DEFAULT_LEGAL.disclaimer,
        sections: mapLegalSectionsForSeed(DEFAULT_LEGAL.disclaimer.sections),
      },
    },
  })
  console.log('✅ Legal global seeded')

  for (const [index, item] of DEFAULT_TIMELINE.entries()) {
    try {
      await payload.create({
        collection: 'timeline',
        data: { ...item, order: index + 1 },
      })
    } catch {
      /* may already exist */
    }
  }
  console.log('✅ Timeline seeded')

  const team = [
    { name: 'Alexander', role: 'Co-Founder', bio: 'Co-founded Mynanny in 2024.', order: 1 },
    { name: 'James', role: 'Co-Founder', bio: 'Co-founded Mynanny in 2024.', order: 2 },
  ]

  for (const member of team) {
    const existing = await payload.find({
      collection: 'team',
      where: { name: { equals: member.name } },
      limit: 1,
    })
    if (!existing.docs.length) {
      await payload.create({ collection: 'team', data: member })
    }
  }
  console.log('✅ Team seeded')

  console.log('\n🎉 Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

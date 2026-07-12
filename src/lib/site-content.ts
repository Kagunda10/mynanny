export const COMPANY = {
  name: 'Mynanny',
  legalName: 'Mynanny App Ltd',
  tagline: 'Cleaning & Domestic Services',
  founded: 2024,
  location: 'Ruiru, Kenya',
  website: 'https://mynanny.co.ke',
  appUrl: 'https://web.mynanny.co.ke',
  email: 'info@mynanny.co.ke',
  supportEmail: 'support@mynanny.co.ke',
  phones: ['+254 726 378 444'],
  whatsapp: '+254726378444',
  social: {
    facebook: 'https://www.facebook.com/mynanny.ke/',
    twitter: 'https://twitter.com/mynanny_ke',
    linkedin: 'https://www.linkedin.com/company/mynannykenya/',
    instagram: 'https://www.instagram.com/mynanny_/',
  },
} as const

export const ABOUT = {
  founders: ['Alexander', 'James'],
  origin:
    'Started operating in 2024 by Alexander and James, Mynanny was born from a desire to give working homeowners access to professional, world-class domestic services. They identified a gap in the market for reliable domestic help and built a solution that benefits both busy families and professional domestic workers in Kenya.',
  body:
    'Mynanny connects homeowners with independent domestic service professionals, including nannies, caregivers, gardeners, and cleaning experts. Every worker has years of experience and undergoes rigorous background checks. Our platform features a robust rating system to ensure consistent, excellent results.',
  mission:
    'To digitize access to domestic services and create high quality job opportunities for independent domestic workers in Kenya.',
  vision:
    'To provide the best commercial cleaning solutions for all families in Eastern and Central Africa.',
  whyChoose: [
    {
      title: 'Professionalism',
      description: 'Our domestic workers have extensive experience in their respective fields.',
    },
    {
      title: 'Trust and safety',
      description:
        'We conduct thorough background checks and maintain a rating system to ensure reliability and excellence.',
    },
    {
      title: 'Convenience',
      description: 'Easily access top-tier domestic services through our user-friendly platform.',
    },
    {
      title: 'Community impact',
      description:
        'By hiring through Mynanny, you support local professionals and contribute to quality jobs in Kenya.',
    },
  ],
} as const

export type LegalSection = {
  id: string
  title: string
  paragraphs?: string[]
  list?: string[]
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'Mynanny App Ltd ("Mynanny", "we", "us", "our") is committed to providing quality services and protecting your personal information. This policy outlines how we collect, use, disclose, store, secure, and dispose of your data.',
      'We comply with the Kenya Data Protection Act No. 24 of 2019. A copy of the Act may be obtained from the Office of the Data Protection Commissioner at odpc.go.ke.',
    ],
  },
  {
    id: 'collection',
    title: 'What we collect',
    paragraphs: [
      'We collect your name, phone number, residential address, and email address when you register, use our contact form, or book services through our website or app.',
    ],
    list: [
      'Provide information about products or services',
      'Process your requests and bookings',
      'Send service-related communications (you may opt out of marketing)',
      'Perform administrative and operational tasks',
      'Comply with laws, regulations, and payment system requirements',
    ],
  },
  {
    id: 'use',
    title: 'How we use your information',
    paragraphs: [
      'If you do not provide some or all requested information, Mynanny may be unable to provide you with a complete and accurate service.',
      'Some personal details are visible to other members on the platform, such as your first name and suburb location. Your full residential address is only shared after a confirmed booking, for the purpose of performing services.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and analytics',
    paragraphs: [
      'We use cookies to remember preferences, improve site experience, and compile aggregate traffic data. You may disable cookies in your browser, though some features may not function fully.',
      'Our website uses Google Analytics to understand traffic and page usage. Google Analytics does not identify individual users. You may opt out via Google\'s opt-out tools or by disabling cookies.',
      'We also integrate with social platforms such as Facebook, LinkedIn, and Twitter. Review each platform\'s privacy policy if you interact with those features.',
    ],
  },
  {
    id: 'security',
    title: 'Security and storage',
    paragraphs: [
      'We use Vultr Web Services (United States) to store personal information. Access is authenticated and encrypted. Servers are protected with firewalls.',
      'Our website is scanned regularly for security vulnerabilities. Sensitive information is transmitted via SSL encryption.',
      'While we take reasonable steps to maintain secure connections, providing personal information over the internet is at your own risk.',
    ],
  },
  {
    id: 'disclosure',
    title: 'Disclosure to third parties',
    paragraphs: [
      'Mynanny does not sell personal or customer information. We disclose data only when necessary to service providers who agree to our privacy standards, to comply with legal requirements, or to protect the rights, property, or safety of Mynanny, our customers, or third parties.',
      'For job seekers, we may disclose your name and certificate of good conduct reference number to relevant government agencies to validate background checks.',
      'If Mynanny undergoes a change of control or asset sale, customer information may be disclosed to a potential purchaser under confidentiality agreements.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    paragraphs: [
      'You may access, update, or correct your personal information through your profile on the website or app, or by contacting us in writing.',
      'We will not charge a fee for access requests but may charge an administrative fee for copies. We may require identification before releasing information.',
      'You may opt out of direct marketing by following the procedure in each communication.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    paragraphs: [
      `Questions about this policy: ${COMPANY.supportEmail} or ${COMPANY.email}.`,
      'This policy may be updated from time to time. Changes take effect when posted on this page.',
    ],
  },
]

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'operator',
    title: 'Operator and definitions',
    paragraphs: [
      'Mynanny\'s website and app are owned and operated by Mynanny App Ltd, a corporation incorporated in Kenya.',
      'Mynanny acts as an intermediary between employers (families seeking domestic help) and job seekers (independent domestic workers). Mynanny is a matching and payment service, not an employment agency.',
    ],
    list: [
      'Website: mynanny.ke and mynanny.co.ke',
      'App: available on Apple App Store and Google Play',
      'Job Seeker: person offering household services (nanny, cleaning, gardening, etc.)',
      'Employer: person or family requesting household services',
      'Member: any registered employer or job seeker',
    ],
  },
  {
    id: 'membership',
    title: 'Membership requirements',
    paragraphs: [
      'Both employers and job seekers must register to access services. Members must provide accurate, complete information including email, phone, residential address, and identification number.',
      'Businesses, bureaus, childcare centers, and recruitment agencies may not register. The platform is for personal use by individual members only.',
      'Job seekers must be aged 18+, legally able to work in Kenya, and provide photo ID, police clearance, and a valid First Aid certificate before approval.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments and fees',
    paragraphs: [
      'Payment processing for job seekers is provided by M-Pesa and subject to M-Pesa terms. By using Mynanny, you authorize sharing of transaction information with M-Pesa as required.',
      'All bookings between employers and job seekers must be made through the website or app, except Quick Cleaning and Quick Gardening services which are strictly cash.',
      'For quick cleaning and outdoor services, Mynanny receives 35% commission (inclusive of VAT) on all bookings.',
      'Overtime is charged in 30-minute increments beyond the confirmed scheduled time.',
    ],
  },
  {
    id: 'employers',
    title: 'Employer obligations',
    paragraphs: [
      'Employers engage job seekers as independent contractors. Mynanny is not a party to that relationship.',
      'Employers must ensure a safe and healthy working environment and are solely responsible for health and safety while workers are on site.',
      'Mynanny recommends updating home and contents insurance for accidental property damage. Mynanny is not liable for property damage, personal injury, illness, or death caused by a job seeker.',
      'For home nanny services, job seeker contact information is not released until payment is successfully received.',
    ],
  },
  {
    id: 'cancellation',
    title: 'Cancellation and refunds',
    paragraphs: [
      'Employer cancels more than 15 minutes before start: 10% of booked rate is carried forward to the next booking.',
      'Employer cancels within 15 minutes of start: no fee charged.',
      'Home nanny — job seeker no-show without notice: 100% refund to employer.',
      'Home nanny — job seeker cancels before start: 100% refund to employer.',
      'Home nanny — employer cancels within 24 hours of start: 50% refund to employer.',
      'No refund applies if a job seeker is mistreated, works in unsafe conditions, or if location or job description changes after booking confirmation.',
    ],
  },
  {
    id: 'workers',
    title: 'Job seeker obligations',
    paragraphs: [
      'All communications and bookings must go through the website or app. Only the approved job seeker may attend a booking.',
      'Job seekers confirm booking length at completion. Funds must not be retained for more than 3 days.',
      'Cancellations, late arrivals, or no-shows may result in negative ratings. Mynanny does not alter ratings arising from these events.',
      'False pretence (e.g. accepting transport then failing to report without notice) may result in immediate removal and legal action.',
    ],
  },
  {
    id: 'disputes',
    title: 'Dispute resolution',
    paragraphs: [
      'Members should first attempt to resolve disputes through platform communication channels.',
      'If unresolved, submit a written dispute to support@mynanny.co.ke within 24 hours, including correspondence and feedback examples.',
      'A Mynanny team member reviews disputes within 24–48 hours and makes a final decision.',
    ],
  },
  {
    id: 'liability',
    title: 'Liability',
    paragraphs: [
      'Members use the website and app at their own risk. Mynanny accepts no liability for member conduct, online or offline.',
      'Mynanny\'s maximum aggregate liability is limited to the total amount paid by the member for chargeable services during their membership term.',
      'Mynanny is not liable for indirect, punitive, or consequential losses including loss of income, profits, goodwill, or data.',
    ],
  },
  {
    id: 'termination',
    title: 'Account termination',
    paragraphs: [
      'Mynanny may suspend or terminate membership for breach of terms, negative feedback, or inactivity exceeding 18 months.',
      'Members may terminate via the Support section of the website or app. To delete your account permanently, see our Delete Account page.',
    ],
  },
]

export const DISCLAIMER_SECTIONS: LegalSection[] = [
  {
    id: 'accuracy',
    title: 'Information accuracy',
    paragraphs: [
      'This website has been compiled with care by Mynanny. However, information may contain errors, inaccuracies, or typographical mistakes. Mynanny is not responsible for and cannot be held liable for the contents of this website.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to the website',
    paragraphs: [
      'Mynanny may improve or change this website at any time. Mynanny is not liable for consequential loss resulting from incorrect information.',
    ],
  },
  {
    id: 'electronic',
    title: 'Electronic communication',
    paragraphs: [
      'Mynanny is not liable for loss resulting from the use or temporary unavailability of electronic communication, including non-delivery or delayed delivery of messages, interception by third parties, or transmission of viruses.',
    ],
  },
  {
    id: 'indemnity',
    title: 'Indemnity',
    paragraphs: [
      'By using this website you indemnify Mynanny against losses from third-party claims resulting from violation of these terms or from your use of the website.',
    ],
  },
]

export const DELETE_ACCOUNT_STEPS = [
  {
    step: '01',
    title: 'Log in',
    description: 'Open the Mynanny app and sign in with your credentials.',
  },
  {
    step: '02',
    title: 'Go to Profile',
    description: 'Navigate to your profile by tapping your profile picture.',
  },
  {
    step: '03',
    title: 'Delete Account',
    description: 'Scroll to the bottom of profile settings and select "Delete Account".',
  },
  {
    step: '04',
    title: 'Confirm',
    description:
      'Review what happens when your account is deleted, then confirm if you are sure.',
  },
  {
    step: '05',
    title: 'Complete',
    description:
      'Your account and associated data will be permanently removed from our servers after 30 days.',
  },
] as const

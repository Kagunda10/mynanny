import { COMPANY } from '@/lib/site-content'

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

export const CONTACT_INTENTS: ContactIntent[] = [
  {
    id: 'hire',
    icon: 'family_restroom',
    title: 'I want to hire help',
    summary:
      'Live-in nanny, dayburg nanny, caregiver, or a one-off deep clean. Tell us your neighbourhood and we send curated profiles.',
    bestChannel: 'whatsapp',
    responseTime: 'Usually within 4 hours on weekdays',
    actionLabel: 'WhatsApp our matching team',
    actionHref: `https://wa.me/${COMPANY.whatsapp}?text=Hi%20Mynanny%2C%20I%20need%20help%20hiring%20in%20`,
    includeWhenContacting: [
      'Neighbourhood (e.g. Kilimani, Karen, Lavington)',
      'Role needed and live-in vs dayburg',
      'Number of children or rooms if relevant',
      'When you want someone to start',
    ],
  },
  {
    id: 'worker',
    icon: 'badge',
    title: 'I want to join as a worker',
    summary:
      'Apply through the app first. Police clearance, ID, and First Aid certificate are required before approval.',
    bestChannel: 'self-serve',
    responseTime: 'Application review in 3-5 business days',
    actionLabel: 'Start on the Join page',
    actionHref: '/join',
    includeWhenContacting: [
      'National ID number (already uploaded in app)',
      'Police clearance certificate reference',
      'First Aid certificate expiry date',
      'Preferred areas you can work in',
    ],
  },
  {
    id: 'payment',
    icon: 'payments',
    title: 'M-Pesa or payment issue',
    summary:
      'Placement fee, booking payment, or payout not reflecting. M-Pesa processing is handled via Safaricom; we can trace transactions on our side.',
    bestChannel: 'support',
    responseTime: 'Within 1 business day',
    actionLabel: 'Email support with receipt',
    actionHref: `mailto:${COMPANY.supportEmail}?subject=M-Pesa%20payment%20issue`,
    includeWhenContacting: [
      'M-Pesa confirmation code (full SMS text if possible)',
      'Amount and date of transaction',
      'Phone number used for payment',
      'Screenshot of the M-Pesa message',
    ],
  },
  {
    id: 'dispute',
    icon: 'gavel',
    title: 'Dispute, refund, or replacement',
    summary:
      'No-show, cancellation, or a placement that did not work out. Disputes must be raised within 24 hours with written details.',
    bestChannel: 'support',
    responseTime: 'Reviewed within 24-48 hours',
    actionLabel: 'Open a dispute by email',
    actionHref: `mailto:${COMPANY.supportEmail}?subject=Dispute%20-%20`,
    includeWhenContacting: [
      'Booking or placement date',
      'In-app chat history or message screenshots',
      'What outcome you need (refund, replacement, etc.)',
      'Any photos or feedback already submitted on the platform',
    ],
  },
  {
    id: 'account',
    icon: 'manage_accounts',
    title: 'Account, privacy, or deletion',
    summary:
      'Update your details, exercise data rights under the Kenya Data Protection Act, or permanently delete your account.',
    bestChannel: 'self-serve',
    responseTime: 'Deletion completes after 30 days',
    actionLabel: 'See delete account steps',
    actionHref: '/delete-account',
    includeWhenContacting: [
      'Registered email and phone on the account',
      'Whether you are an employer or job seeker',
      'For deletion: confirm you completed in-app steps first',
    ],
  },
  {
    id: 'office',
    icon: 'location_city',
    title: 'Worker skills assessment visit',
    summary:
      'Approved applicants attend a short in-person competency chat at our Nairobi office. Visits are by appointment only.',
    bestChannel: 'phone',
    responseTime: 'We call back same day if you leave a message',
    actionLabel: 'Call to schedule',
    actionHref: `tel:${COMPANY.phones[0].replace(/\s/g, '')}`,
    includeWhenContacting: [
      'Full name as registered in the app',
      'Application reference or phone on your profile',
      'Preferred weekday for the visit',
    ],
  },
]

export const CONTACT_SLAS = [
  {
    label: 'Hiring enquiries (WhatsApp)',
    value: '4 hrs',
    detail: 'Weekday matching requests',
  },
  {
    label: 'Dispute review',
    value: '24-48 hrs',
    detail: 'From support@mynanny.co.ke',
  },
  {
    label: 'Payment tracing',
    value: '1 day',
    detail: 'With valid M-Pesa code',
  },
  {
    label: 'Account deletion',
    value: '30 days',
    detail: 'After in-app confirmation',
  },
] as const

export const DISPUTE_STEPS = [
  {
    step: '1',
    title: 'Try in-app chat first',
    description:
      'Most issues resolve when employer and worker communicate through the platform. Keep messages there so our team can review if needed.',
  },
  {
    step: '2',
    title: 'Email support within 24 hours',
    description: `Send written details to ${COMPANY.supportEmail} with screenshots, booking date, and the outcome you need.`,
  },
  {
    step: '3',
    title: 'Team decision',
    description:
      'A Mynanny team member reviews your case and responds with a final decision. Refund rules depend on who cancelled and when.',
  },
] as const

export const REFUND_RULES = [
  {
    scenario: 'Worker no-show (home nanny)',
    outcome: '100% refund to employer',
  },
  {
    scenario: 'Worker cancels before start',
    outcome: '100% refund to employer',
  },
  {
    scenario: 'Employer cancels within 24 hrs of start',
    outcome: '50% refund to employer',
  },
  {
    scenario: 'Employer cancels 15+ mins before start',
    outcome: '10% carried to next booking',
  },
] as const

export const INQUIRY_TYPES = [
  { value: 'hire', label: 'Hiring help for my home' },
  { value: 'worker', label: 'Joining as a worker' },
  { value: 'payment', label: 'M-Pesa or payment' },
  { value: 'dispute', label: 'Dispute or refund' },
  { value: 'account', label: 'Account or privacy' },
  { value: 'office', label: 'Office assessment visit' },
  { value: 'other', label: 'Something else' },
] as const

export type InquiryType = (typeof INQUIRY_TYPES)[number]['value']

export const SELF_SERVICE_LINKS = [
  { label: 'Pricing and salary ranges', href: '/pricing' },
  { label: 'How vetting works', href: '/why-mynanny' },
  { label: 'Hiring guides', href: '/guides' },
  { label: 'Delete my account', href: '/delete-account' },
  { label: 'Terms and refunds', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
] as const

export function channelLabel(channel: ContactIntent['bestChannel']) {
  switch (channel) {
    case 'whatsapp':
      return 'WhatsApp'
    case 'phone':
      return 'Phone'
    case 'support':
      return 'Support email'
    case 'info':
      return 'General email'
    case 'form':
      return 'Contact form'
    case 'self-serve':
      return 'Self-serve'
  }
}

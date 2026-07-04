import type { Metadata } from 'next'
import { JoinContent } from './content'

export const metadata: Metadata = {
  title: 'Join MyNanny | Become a Trusted Domestic Professional in Nairobi',
  description:
    'Join the MyNanny network. Earn more, grow your skills, and access health cover, training, and flexible hours as a vetted domestic professional in Nairobi.',
}

export default function JoinPage() {
  return <JoinContent />
}

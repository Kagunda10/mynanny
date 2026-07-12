import type { Metadata } from 'next'
import { DeleteAccountContent } from './content'

export const metadata: Metadata = {
  title: 'Delete App Account | Mynanny',
  description:
    'How to permanently delete your Mynanny app account. Data is removed from our servers after 30 days.',
}

export default function DeleteAccountPage() {
  return <DeleteAccountContent />
}

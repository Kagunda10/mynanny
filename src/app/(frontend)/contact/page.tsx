import type { Metadata } from 'next'
import { ContactContent } from './content'
import { getContactPageContent } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Contact MyNanny | Hiring, Support & Disputes Nairobi',
  description:
    'Route your question to the right MyNanny team: hiring via WhatsApp, M-Pesa payment help, disputes within 24 hours, worker applications, and Nairobi office visits. +254 726 378 444.',
}

export default async function ContactPage() {
  const contact = await getContactPageContent()
  return <ContactContent contact={contact} />
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MyNanny | Trusted Domestic Help Agency in Nairobi Since 2019',
  description:
    "Learn about MyNanny — Nairobi's most trusted domestic worker platform. Founded in 2019, serving 5,000+ families with vetted nannies, cleaners, and elderly carers across Kenya.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

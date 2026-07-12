import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MyNanny | Trusted Domestic Help Agency in Kenya Since 2024',
  description:
    "Learn about MyNanny — Kenya's most trusted domestic worker platform. Started operating in 2024, serving families with vetted nannies, cleaners, and elderly carers across Kenya.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

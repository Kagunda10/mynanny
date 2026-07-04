import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { getSiteSettings } from '@/lib/cms'
import '../globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MyNanny - Vetted Nannies, Housekeepers & Cleaners in Nairobi',
    template: '%s | MyNanny',
  },
  description:
    'Find trusted domestic help in Nairobi. Rigorous vetting, instant booking, and professional management for nannies, cleaners, and elderly care.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon-180x180.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'MyNanny',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyNanny - Vetted Domestic Help in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings()

  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:font-semibold"
        >
          Skip to content
        </a>
        <Nav items={siteSettings.navItems} />
        <main id="main-content" className="pt-20 md:pt-24 overflow-x-hidden">
          {children}
        </main>
        <Footer settings={siteSettings} />
        <WhatsAppFab />
      </body>
    </html>
  )
}

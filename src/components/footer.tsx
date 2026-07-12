import Link from 'next/link'
import type { SiteSettingsContent } from '@/lib/cms-types'
import { DEFAULT_SITE_SETTINGS } from '@/lib/defaults'
import { BrandLogo } from './brand-logo'

const SOCIAL_ICONS: Record<string, string> = {
  Instagram: 'photo_camera',
  Twitter: 'alternate_email',
  Facebook: 'groups',
  LinkedIn: 'work',
}

type FooterProps = {
  settings?: SiteSettingsContent
}

export function Footer({ settings = DEFAULT_SITE_SETTINGS }: FooterProps) {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface py-12">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <BrandLogo variant="horizontal-white" className="h-9 w-auto self-start" />
          <p className="text-surface-container-highest/70 text-[16px] leading-relaxed">
            {settings.footerBlurb}
          </p>
          <div className="space-y-2 text-[14px] text-surface-container-highest/70">
            <p>{settings.address}</p>
            <p>
              <a href={`mailto:${settings.email}`} className="hover:text-primary-fixed-dim transition-colors">
                {settings.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="hover:text-primary-fixed-dim transition-colors"
              >
                {settings.phone}
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            {settings.socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${s.platform}`}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary-fixed-dim"
              >
                <span className="material-symbols-outlined">
                  {SOCIAL_ICONS[s.platform] ?? 'link'}
                </span>
              </a>
            ))}
          </div>
        </div>

        {settings.footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[12px]">{col.title}</h4>
            <ul className="space-y-4">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-container-highest/70 hover:text-primary-fixed-dim transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-surface-container-highest/70 hover:text-primary-fixed-dim transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto px-5 md:px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-surface-container-highest/50 text-[12px]">
        <p>&copy; 2026 Mynanny App Ltd. All rights reserved.</p>
        <p>Designed with love in Ruiru</p>
      </div>
    </footer>
  )
}

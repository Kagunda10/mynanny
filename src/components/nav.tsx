'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PrimaryButton } from './ui/primary-button'
import { BrandLogo } from './brand-logo'
import type { NavItem } from '@/lib/cms-types'
import { DEFAULT_SITE_SETTINGS } from '@/lib/defaults'
import { COMPANY } from '@/lib/site-content'

type NavProps = {
  items?: NavItem[]
}

export function Nav({ items = DEFAULT_SITE_SETTINGS.navItems }: NavProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="fixed top-3 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] md:w-[calc(100%-40px)] max-w-[1280px] rounded-full bg-white/90 backdrop-blur-md border border-outline-variant/30 plum-shadow flex justify-between items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/" className="flex shrink-0 items-center min-w-0">
          <BrandLogo variant="horizontal-color" className="h-8 md:h-9 w-auto" priority />
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6 min-w-0">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] xl:text-[15px] whitespace-nowrap transition-colors relative focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded ${isActive
                    ? 'text-primary font-bold after:content-[""] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full'
                    : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            href={COMPANY.appUrl}
            className="hidden lg:block text-on-surface-variant text-sm font-semibold hover:text-brand-pink transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded"
          >
            Login
          </Link>

          <div className="hidden lg:block">
            <PrimaryButton href="/#match-form" className="!py-2 !px-5 text-sm">
              Find a Nanny
            </PrimaryButton>
          </div>

          <Link
            href="/#match-form"
            className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white shadow-sm hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="Find a Nanny"
          >
            <span className="material-symbols-outlined !text-[20px]">person_search</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-surface-container transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="material-symbols-outlined !text-[22px]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-[4.25rem] z-40 bg-white/95 backdrop-blur-lg px-6 pt-6 pb-12 flex flex-col gap-1 lg:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {items.map((item, i) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-[18px] py-3.5 px-4 rounded-2xl transition-colors ${isActive
                        ? 'text-primary font-bold bg-primary-fixed/30'
                        : 'text-on-surface hover:bg-surface-container'
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}
            <div className="mt-6 flex flex-col gap-4 border-t border-outline-variant/20 pt-6">
              <PrimaryButton href="/#match-form" className="w-full justify-center">
                Find a Nanny
              </PrimaryButton>
              <PrimaryButton
                href="/guides"
                variant="secondary"
                className="w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Hiring Guides
              </PrimaryButton>
              <Link
                href={COMPANY.appUrl}
                className="text-on-surface-variant font-semibold py-3 text-center hover:text-brand-pink transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

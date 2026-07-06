import { cn } from '@/lib/utils'
import Image from 'next/image'

const LOGO_SRC = {
  'horizontal-color': '/brand/svg/lockup-horizontal-color.svg',
  'horizontal-white': '/brand/svg/lockup-horizontal-white.svg',
  'stacked-color': '/brand/svg/lockup-stacked-color.svg',
  'stacked-white': '/brand/svg/lockup-stacked-white.svg',
  'icon-color': '/brand/svg/icon-color.svg',
  'icon-gradient': '/brand/svg/icon-gradient.svg',
  'icon-white': '/brand/svg/icon-white.svg',
  'app-icon': '/brand/svg/appicon-gradient.svg',
} as const

export type BrandLogoVariant = keyof typeof LOGO_SRC

type BrandLogoProps = {
  variant?: BrandLogoVariant
  className?: string
  priority?: boolean
}

export function BrandLogo({
  variant = 'horizontal-color',
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC[variant]}
      alt="MyNanny"
      width={variant.startsWith('horizontal') ? 136 : 40}
      height={variant.startsWith('horizontal') ? 40 : variant.startsWith('stacked') ? 120 : 40}
      priority={priority}
      className={cn('h-auto w-auto max-h-full object-contain', className)}
    />
  )
}

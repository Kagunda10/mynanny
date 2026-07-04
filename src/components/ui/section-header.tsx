import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  centered?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  eyebrow?: ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered ? 'text-center' : '', 'mb-12', className)}>
      {eyebrow}
      <h2
        className={cn(
          'text-[28px] md:text-heading font-semibold leading-[1.2] tracking-tight',
          eyebrow ? 'mt-6' : undefined,
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-on-surface-variant mt-4 max-w-xl text-lg leading-relaxed',
            centered && 'mx-auto',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

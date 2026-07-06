'use client'

import { motion, useMotionValue, useTransform } from 'motion/react'
import { type ReactNode, useRef } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface PrimaryButtonProps {
  children: ReactNode
  icon?: string
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  type?: 'button' | 'submit'
  disabled?: boolean
  showIcon?: boolean
  target?: string
  rel?: string
}

export function PrimaryButton({
  children,
  icon = 'arrow_forward',
  href,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
  showIcon = true,
  target,
  rel,
}: PrimaryButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const translateX = useTransform(x, [-100, 100], [-2, 2])
  const translateY = useTransform(y, [-100, 100], [-2, 2])

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const baseClasses = {
    primary:
      'inline-flex w-fit max-w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand-pink px-6 py-3 font-semibold text-white',
    secondary:
      'inline-flex w-fit max-w-full items-center justify-center whitespace-nowrap rounded-full border border-outline-variant px-6 py-3 font-semibold text-on-surface hover:bg-surface-container transition-colors',
    ghost:
      'inline-flex w-fit max-w-full items-center justify-center whitespace-nowrap font-semibold text-on-surface-variant hover:opacity-80 transition-opacity',
  }

  const primaryClasses = cn(
    baseClasses.primary,
    'group',
    disabled && 'opacity-60 pointer-events-none',
    className,
  )

  const content = (
    <>
      <span>{children}</span>
      {variant === 'primary' && showIcon && (
        <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-pink group-hover:translate-x-0.5 transition-transform">
          <span className="material-symbols-outlined !text-[18px]">{icon}</span>
        </span>
      )}
    </>
  )

  if (variant !== 'primary') {
    if (href) {
      const isInternal = href.startsWith('/')
      if (isInternal) {
        return (
          <Link
            href={href}
            onClick={onClick}
            className={cn(baseClasses[variant], disabled && 'opacity-60 pointer-events-none', className)}
          >
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={cn(baseClasses[variant], disabled && 'opacity-60 pointer-events-none', className)}
        >
          {children}
        </a>
      )
    }
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(baseClasses[variant], disabled && 'opacity-60 pointer-events-none', className)}
      >
        {children}
      </button>
    )
  }

  if (href) {
    const isInternal = href.startsWith('/')
    const MotionLink = motion.create(Link)
    
    if (isInternal) {
      return (
        <MotionLink
          ref={ref as any}
          href={href}
          onClick={onClick}
          className={primaryClasses}
          style={{ x: translateX, y: translateY }}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          whileTap={{ scale: 0.95 }}
        >
          {content}
        </MotionLink>
      )
    }
    
    return (
      <motion.a
        ref={ref as any}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={primaryClasses}
        style={{ x: translateX, y: translateY }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={primaryClasses}
      style={{ x: translateX, y: translateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  )
}

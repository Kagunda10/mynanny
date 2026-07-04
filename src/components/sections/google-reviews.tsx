'use client'

import Link from 'next/link'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { SectionHeader } from '@/components/ui/section-header'
import { motion } from 'motion/react'
import type { TestimonialReview } from '@/lib/cms-types'
import { DEFAULT_HOMEPAGE, DEFAULT_TESTIMONIALS } from '@/lib/defaults'
import { COMPANY } from '@/lib/site-content'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-star-amber mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined !text-[16px]"
          style={{ fontVariationSettings: i < count ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  )
}

type GoogleReviewsProps = {
  reviews?: TestimonialReview[]
  aggregateRating?: number
  reviewCount?: number
}

export function GoogleReviews({
  reviews = DEFAULT_TESTIMONIALS,
  aggregateRating = DEFAULT_HOMEPAGE.aggregateRating,
  reviewCount = DEFAULT_HOMEPAGE.reviewCount,
}: GoogleReviewsProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <SectionHeader
            title="What Nairobi parents say"
            subtitle={
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[24px] font-medium">{aggregateRating}</span>
                <Stars count={Math.round(aggregateRating)} />
                <span className="text-[12px] font-medium text-on-surface-variant">
                  based on {reviewCount}+ reviews
                </span>
              </div>
            }
            centered={false}
            className="mb-0"
            subtitleClassName="mx-0"
          />
          <Link
            href={COMPANY.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-pink font-bold flex items-center gap-2 border-b-2 border-brand-pink/20 pb-1 hover:border-brand-pink/50 transition-colors"
          >
            Read all Google Reviews
            <span className="material-symbols-outlined">arrow_outward</span>
          </Link>
        </div>

        <SectionEntrance>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.name}
                className="break-inside-avoid double-bezel cursor-default"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="double-bezel-inner">
                  <Stars count={review.rating} />
                  <p className="italic mb-6">{review.body}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center font-bold`}>
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold">{review.name}</p>
                      <p className="text-[12px] text-on-surface-variant">{review.location}</p>
                    </div>
                  </div>
                  {review.reply && (
                    <div className="bg-surface-container-low p-4 rounded-xl border-l-4 border-primary/30 mt-4">
                      <p className="text-[12px] font-bold text-primary mb-1">Owner Reply:</p>
                      <p className="text-[12px]">{review.reply}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionEntrance>
      </div>
    </section>
  )
}

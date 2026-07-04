'use client'

import Link from 'next/link'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { SectionHeader } from '@/components/ui/section-header'
import type { ArticlePreview } from '@/lib/cms-types'
import { DEFAULT_ARTICLES } from '@/lib/defaults'

type BlogPreviewProps = {
  articles?: ArticlePreview[]
}

export function BlogPreview({ articles = DEFAULT_ARTICLES.slice(0, 3) }: BlogPreviewProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
        <SectionHeader title="Hiring Guides" centered={false} className="mb-0" />
        <Link href="/guides" className="text-primary font-bold">
          View all guides →
        </Link>
      </div>

      <SectionEntrance>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/guides/${article.slug}`} className="group">
              <div className="double-bezel mb-4 overflow-hidden">
                <div className="double-bezel-inner !p-0 aspect-[16/10] overflow-hidden">
                  {article.image ? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={article.image}
                      alt={article.title}
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-low" />
                  )}
                </div>
              </div>
              <p className="text-[12px] text-primary font-bold uppercase tracking-widest mb-2">
                {article.category}
              </p>
              <h3 className="text-[18px] font-semibold group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-on-surface-variant mt-2 text-[14px]">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </SectionEntrance>
    </section>
  )
}

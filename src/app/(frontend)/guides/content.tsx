'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { EyebrowPill } from '@/components/ui/eyebrow-pill'
import type { ArticlePreview } from '@/lib/cms-types'

const ARTICLES_PER_PAGE = 6

const categories = [
  'All Guides',
  'Hiring guides',
  'Pricing',
  'Worker resources',
  'Home care',
] as const

const articles = [
  {
    slug: 'nanny-costs-in-nairobi-2026',
    title: 'What does a nanny cost in Nairobi in 2026?',
    excerpt:
      "An exhaustive breakdown of current market rates, NHIF/NSSF requirements, and why the 'live-in' vs 'live-out' gap is widening.",
    category: 'Pricing',
    readTime: '8 min read',
    featured: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAr17RIgft-IyaMcgnJExnJnulLVG78biOB2JKtGGr1Gt71DoK6Say3Ri6id9WuhvMHYZBIzeR4jQqnkueIpNFI-aYBnjYZyaWDIn-16tbGoMe1sqrAuscKPxVQxLSxEjFugtBkQSPpz0PV4-Y36e4trtaw__fFvD4DX4ITKaSqSLH0LzEc3uspXk6J3ZDzQ53wyAF744iuM8tE2jXhmD9KmXUs0N3yAAifUmDfp-Vmhqj01S6wovFM_w',
    author: 'Wanjiku Maina',
    authorRole: 'Lead Welfare Specialist',
    authorAvatar: '',
  },
  {
    slug: 'traditional-bureau-vs-digital-apps',
    title: 'Traditional Bureau vs. Digital Apps: Which is safer for your family?',
    excerpt:
      'A comparison of hiring through traditional bureaus versus modern digital platforms for domestic help in Nairobi.',
    category: 'Hiring guides',
    readTime: '5 min read',
    featured: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuypH1AhSh-xNcU90Xigk6dLQatseSOP2Gu18ghGGG1gsYx_C29rF7dJY8flsiPnrA2_nY2FZcxv6HDizOtg0AXQtKQG0w2XpycKGwXKYgNBGxJ0aa5ESqwW9yG1Xm1UgR9BNGNaUI6uLJuwfoGXz8pD0fgCA0hZQykg02ECfKjcJibR-Y4QSatbdkjbQq-JIP3enFiUeMrEKbvREBOfW6vLIY109jk3xnRJruLKKmQzCdLVxkxE-qZg',
    author: 'David Kibe',
    authorRole: 'Hiring Specialist',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDVWW4gl7XER7HhZrgYL24Uk4_JyH74xqaZYNpjbuQVrdHKvV5i3ENUm6UPp3I27fMCIleYMvfoLwRI4hSdSy4FwSuSDDkE6eyPNxWP4jxN__NOO9LbpmwRfAQa3YvyUsZGPcCTkSAhyPO9dmE7Ix4JuecFSIeUnUpKN4KCX5GBYgCSLUsLnW89T_Xsr4fiAAmkymmsugrZXvj_COUn2pr_LUji8PMN2UCCNbT2Svw-0_Z23JeUOmdeNA',
  },
  {
    slug: 'nanny-interview-questions',
    title: '12 non-negotiable questions to ask during a nanny interview.',
    excerpt:
      'The essential questions that reveal whether a candidate is the right fit for your household and children.',
    category: 'Hiring guides',
    readTime: '12 min read',
    featured: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGUshKwWIL37JJzcGZaL1NukMfU35A4GzYj2sXKzB2lGDoD34RuivGuL5fPC3N8KrlxHYyFWSBDUgFBADkwWomxBLL1w2xpmU171hW5FPs6ETjze_TPZRo0k-fkZW6v6G5nmn9YoDwxGXh9sOuDlosLklOktBZOkQx7uJZlCMYEP8LQgZpQG_4AyDvtOLyrzAdbAAfDWtr9vMzB9vFIMcJZ12vlUljktuoZaQtrfa_lzP-WwPJYSMivQ',
    author: 'Edna Kwamboka',
    authorRole: 'Vetting Expert',
    authorAvatar: '',
  },
  {
    slug: 'deep-cleaning-prices-nairobi',
    title: 'Deep cleaning prices in Nairobi: Why they vary by neighborhood.',
    excerpt:
      'Understanding the factors that drive cleaning costs across different Nairobi estates and how to budget accordingly.',
    category: 'Home care',
    readTime: '6 min read',
    featured: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBun7tBfFKoEgRAO4HCcfpjOa8YCgXDn7b-x9o7pej5U50ek0WpTvpTimdDgCMojR7SGnDHMjPbUxn0lyyjeEy2X_LPAx5_vW57O5-9UbziPD9hQPF55jLS0EcHIEz99ufTIlFUil3duCdj_MhQi2IXEm39zPzPo3WH8hq5h5VVJOtC4hHR2qEjsi4zyptZ0lHBWSqCor9GjzFI7S94uF8F5O41sKNHAuOXnmg61eeOlkWA26ZUQ1vmCg',
    author: 'Sarah Githinji',
    authorRole: 'Home Care Advisor',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqfmRTe_K_O72sGiqwL52RC4CzB9or5z210mN_hk3A3WTb3qvD47bCZSZ41saWVVXMM6kZJIWklbY-RW8BMqYearPnb06In4anyltGsiBmLXNK0o4pN2ES4V_N14uLdfcfiqhk4P74Tp5fK7GLjq5ANaYjM8rW8tg97aENYEQg7ntljQwayX1vpUM4fcBnewaykGcYo3mT7YZj0_Or8L_RR4nT8QU2soAfn82sIC7FHMYNAz6Jwqr50Q',
  },
  {
    slug: 'domestic-worker-contract-template',
    title: 'The Essential Domestic Worker Contract Template (Kenya 2024).',
    excerpt:
      'A comprehensive contract template covering working hours, leave, termination, and statutory requirements.',
    category: 'Hiring guides',
    readTime: '10 min read',
    featured: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBe0O2tTe4JM9GVqI6h9SlAcb_RIyjiu0CXpEGzz-hPO7laWWTtOReUFmQ_GPudQERwwGf2gJYdkxd-XlsbzA6asW-F0283yPEqmrgtRjvMgzoj_hR3AEMViEEVbrdTyfZHuZMSHgkFQh4l3JA5WQ-SMJTimILjcpPvcQYaiuB7BaSM5Y8yobQUOWnerrBqgMT2S0NlgsTKsPL6ueN-s-tEdaSHqlgD_-NauBYw6o95PxQLFkskfiT9RA',
    author: 'Legal Team',
    authorRole: 'MyNanny Legal',
    authorAvatar: '',
  },
  {
    slug: 'setting-a-schedule-nanny',
    title: 'Setting a schedule: How to balance household chores and childcare.',
    excerpt:
      'Practical tips for structuring a nanny or housekeeper schedule that works for both your family and your worker.',
    category: 'Worker resources',
    readTime: '7 min read',
    featured: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMDQZsPKZ7y7FXLC3wIiZkw6liF_PTRIrxdH5MYQv5AFgtBJNH-_p8KEOC8fadlMkBtnGmtGJWzIMV0_FGiIJ3Y4wAgyRhopfiNMh1xlBme4mF_TgecM-2d-UrGcN2P5mNujTxgd6bE3quBf-KUiTlU4bv2qRoHH2Zdvjghbnxb5MxsbnT0Hv21AKHMhngKQ6Qn0WNKg6iTCPKtI98lq14gtU0Q3nydRYCxf8KkKFTlTu8DZbeWXNOzQ',
    author: 'Grace Njeri',
    authorRole: 'Childcare Specialist',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI2spWOIC8OmmFEPTh-G8SHlpITo31oq_cCCxcLY0VD4Boo7p6B-GkxPlPXSh2rc_3NJ02SrKaCnNhunxakyNv9dwNFWeqh7_n8sH0G6pLDiE50gOqfDy2-WSZLYfG4if6loTH9JEX5KkSzo9_OvP3k47bPqkT4GsKg9zBTu3Phy9NWf7wLGcrTuJQ-7PgggPsxmyzjgD-QeJnO4EOTPd2Z1ssYJ_zCb9snQG4VRPxtKU57g30B9-yAQ',
  },
  {
    slug: 'first-aid-for-nannies',
    title: 'First Aid for Nannies: A complete guide to household safety.',
    excerpt:
      'Essential first aid knowledge every nanny should have, from choking response to burn treatment.',
    category: 'Worker resources',
    readTime: '15 min read',
    featured: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjs2faSEPo6Ok7bTh4z4yvEz6yewRfUVhTyvhF7Nm9kv2uCDOJ0B4xpkEbXh5n0J-Ueykd8T1MS2fQxl8jN4pbHyih8Tl79WPzszjy7ecTbRA_VfubxFnOWlXgy_e9ClhtXuqHbsZICAB92J_dxtp6l6WjL_hCZKJjwBhfTGIl4SsTV18vNDNWx_b0P2z0h8oOwXQI_GBKCW7-YlxCJECgpCcUWdPxz_tU-BzkL5_hsGyWB5jZWGfa9w',
    author: 'Dr. Robert Omondi',
    authorRole: 'Health & Safety',
    authorAvatar: '',
  },
]

type GuideArticle = (typeof articles)[number]

function mapCmsArticles(cmsArticles: ArticlePreview[]): GuideArticle[] {
  return cmsArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    readTime: a.readTime,
    featured: a.featured ?? false,
    image: a.image ?? '',
    author: a.author ?? 'MyNanny Team',
    authorRole: 'Editorial',
    authorAvatar: '',
  }))
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
        active
          ? 'bg-primary text-on-primary'
          : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
      }`}
    >
      {label}
    </button>
  )
}

function ArticleCard({
  slug,
  title,
  category,
  readTime,
  image,
  author,
  authorAvatar,
  index,
}: {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  author: string
  authorAvatar: string
  index: number
}) {
  return (
    <SectionEntrance delay={index * 0.1}>
      <Link href={`/guides/${slug}`} className="group block h-full">
        <article className="double-bezel h-full">
          <div className="double-bezel-inner !p-4 h-full flex flex-col">
            <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="bg-surface-container-highest text-primary px-3 py-1 rounded-full text-xs font-medium">
                {category}
              </span>
              <span className="text-outline text-xs">{readTime}</span>
            </div>
            <h3 className="text-lg font-medium text-on-background mb-4 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-3 mt-auto">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={author}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary text-[10px] font-bold">
                  {author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
              )}
              <p className="text-sm font-semibold text-on-surface-variant">{author}</p>
            </div>
          </div>
        </article>
      </Link>
    </SectionEntrance>
  )
}

export function GuidesContent({ cmsArticles }: { cmsArticles?: ArticlePreview[] }) {
  const displayArticles = cmsArticles?.length ? mapCmsArticles(cmsArticles) : articles

  const [activeCategory, setActiveCategory] = useState<string>('All Guides')
  const [currentPage, setCurrentPage] = useState(1)

  const featured = displayArticles.find((a) => a.featured) ?? displayArticles[0]
  const nonFeatured = displayArticles.filter((a) => !a.featured)
  const filtered =
    activeCategory === 'All Guides'
      ? nonFeatured
      : nonFeatured.filter((a) => a.category === activeCategory)

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE))
  const paginatedArticles = useMemo(
    () => filtered.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE),
    [filtered, currentPage],
  )

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  return (
    <>
      {/* ── Hero (left-aligned) ─────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-12">
        <SectionEntrance>
          <header className="max-w-3xl">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm font-semibold text-outline mb-4"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="material-symbols-outlined !text-[12px]">chevron_right</span>
              <span className="text-on-surface-variant">Guides</span>
            </nav>

            <EyebrowPill icon="menu_book" text="Guides & resources" />

            <h1 className="mt-6 text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight mb-6">
              Everything about hiring — and working — in Kenyan homes.
            </h1>

            <p className="text-lg leading-relaxed text-on-surface-variant mb-8">
              Expert advice on vetting, market rates, labor laws, and managing professional
              relationships for Nairobi{"'"}s modern households.
            </p>

            {/* Search bar */}
            <div className="flex flex-col gap-6">
              <div className="relative max-w-xl">
                <input
                  type="search"
                  aria-label="Search guides"
                  placeholder="Search guides (e.g., contracts, wages)..."
                  className="w-full h-[52px] bg-white border border-outline-variant/50 rounded-full px-12 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all shadow-sm"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
              </div>

              {/* Category filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <CategoryPill
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => handleCategoryChange(cat)}
                  />
                ))}
              </div>
            </div>
          </header>
        </SectionEntrance>
      </section>

      {/* ── Featured Article ─────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 mb-12">
        <SectionEntrance delay={0.1}>
          <div className="double-bezel">
            <div className="double-bezel-inner !p-0 overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-7/12 relative min-h-[300px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-primary text-on-primary px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    Featured Guide
                  </span>
                </div>
              </div>
              <div className="md:w-5/12 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="bg-surface-container-highest text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {featured.category}
                  </span>
                  <span className="text-outline text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined !text-[14px]">schedule</span>
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="text-[24px] md:text-[32px] font-semibold leading-[1.2] text-on-background mb-6">
                  {featured.title}
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-8">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm">
                    {featured.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-background">{featured.author}</p>
                    <p className="text-xs text-outline">{featured.authorRole}</p>
                  </div>
                </div>
                <Link
                  href={`/guides/${featured.slug}`}
                  className="text-primary font-bold flex items-center gap-2 group"
                >
                  Read full guide
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* ── Article Grid ─────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16">
        {paginatedArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article, i) => (
                <ArticleCard
                  key={article.slug}
                  {...article}
                  authorAvatar={article.authorAvatar}
                  index={i}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
                <a
                  href="#articles"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                    currentPage === 1
                      ? 'border-outline-variant/20 text-outline/40 pointer-events-none'
                      : 'border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
                </a>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href="#articles"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page)
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      page === currentPage
                        ? 'bg-primary text-on-primary'
                        : 'border border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#articles"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                    currentPage === totalPages
                      ? 'border-outline-variant/20 text-outline/40 pointer-events-none'
                      : 'border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary'
                  }`}
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
                </a>
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined !text-[48px] mb-4 block opacity-40">
              search_off
            </span>
            <p className="text-lg">No articles in this category yet.</p>
            <button
              onClick={() => handleCategoryChange('All Guides')}
              className="text-primary font-semibold mt-2 hover:underline"
            >
              View all guides
            </button>
          </div>
        )}
      </section>

      {/* ── Newsletter: Plum Slab ────────────────────────────── */}
      <section className="pb-24">
        <SectionEntrance delay={0.2}>
          <div className="floating-slab p-10 md:p-20 text-inverse-on-surface">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2">
                <h2 className="text-[36px] md:text-[48px] font-semibold leading-[1.1] mb-4 text-white">
                  One useful email a month.
                </h2>
                <p className="text-lg text-on-surface-variant/80">
                  Hiring tips, market rates, no spam.
                </p>
              </div>
              <div className="md:w-5/12 w-full">
                <form className="flex items-center bg-white/10 border border-white/20 rounded-full pl-6 pr-1.5 py-1.5">
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    className="flex-grow bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                    aria-label="Subscribe"
                  >
                    <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
                  </button>
                </form>
                <p className="text-xs text-on-surface-variant/60 mt-4 px-2">
                  We respect your inbox. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </SectionEntrance>
      </section>
    </>
  )
}

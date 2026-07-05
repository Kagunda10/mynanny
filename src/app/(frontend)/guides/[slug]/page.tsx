import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollProgress } from './scroll-progress'
import { ShareButtons } from './share-buttons'
import { SectionEntrance } from '@/components/motion/section-entrance'
import { PrimaryButton } from '@/components/ui/primary-button'
import { getArticleBySlug } from '@/lib/cms'

const AUTHOR_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCiMBp0YMjcZaG-8QK5e89qo5WTyY-VNxxdSEtA_Snr4va68C3t78Rq49gciL2lbKqvt2hFbynRa75O9qQN1906rY9ayg6arSi3a6byGwkNhqDu09XMrWDZYCZItnjCP2rlHysY7thEv_Epnfv9hAHsjsbHt2_dylTKqYtYztfIkDgwQb5TJuWC1bUYgkq9Tr82BHNS39ONhLRqhgGIiPcOn9Qv-exCeX0g0uZWp05r4t8Pn4LlInEk8g'

/* ── Article data (hardcoded until CMS is wired up) ─────────── */

interface Article {
  slug: string
  title: string
  category: string
  categorySlug: string
  author: string
  authorTitle: string
  authorBio: string
  date: string
  readTime: string
  image: string
  toc: { id: string; label: string }[]
  content: React.ReactNode
}

const articles: Record<string, Article> = {
  'nanny-costs-in-nairobi-2026': {
    slug: 'nanny-costs-in-nairobi-2026',
    title: 'What does a nanny cost in Nairobi in 2026?',
    category: 'Hiring Guide',
    categorySlug: 'hiring',
    author: 'Sarah Wanjiku',
    authorTitle: 'Senior Research Analyst at MyNanny',
    authorBio:
      'Sarah is the Lead Consultant at MyNanny Kenya. She specializes in family advisory services and has helped over 500 households find the right domestic support. She is a frequent contributor to national conversations on domestic worker rights.',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBG5a53KZ_awjHRSxpSDUb88YH510jTgs013SreZ0VMTn8EfVvMWyk02uyvP1MrIHNbSRvIIVRQmpt9IPzZFNK1IpqSAJ_Q8-hMF7LakQPiGDD09D8X1SnPmIyxqrqTD5uiEyZmIW-XLVvjM25vHlqFCgbLITEi9vfFeaYrfQUcGbKT4VXnTJHS8kuy_YDLTxsBMRmrYLcDbTrPkYH9J1vZ2v25KFCFSI9Z5KHT-i45euMnWW6N1XgHKg',
    toc: [
      { id: 'overview', label: 'Market Benchmarks' },
      { id: 'salary-ranges', label: 'Beyond Basic Salary' },
      { id: 'legal', label: 'Legal Requirements' },
      { id: 'hidden-costs', label: 'Vetting Costs' },
    ],
    content: (
      <>
        <p className="text-lg leading-relaxed text-on-surface">
          Navigating the domestic services market in Nairobi has become increasingly complex. As we
          enter 2026, several factors—from new statutory requirements to the rising cost of
          living—have shifted the baseline for what constitutes a fair and competitive salary for
          professional nannies.
        </p>

        <h2 id="overview">Current Market Benchmarks</h2>
        <p>
          The salary of a nanny in Nairobi depends heavily on their experience level, specialized
          training (such as First Aid or Early Childhood Education), and the specific requirements
          of the household.
        </p>
        <ul className="space-y-4 list-none pl-0">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-brand-pink mt-1 shrink-0">
              check_circle
            </span>
            <span>
              <strong>Entry Level:</strong> KES 18,000 – 25,000 per month for basic childcare and
              housekeeping assistance.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-brand-pink mt-1 shrink-0">
              check_circle
            </span>
            <span>
              <strong>Mid-Tier:</strong> KES 25,000 – 40,000 per month for nannies with 3-5 years
              of experience and verified references.
            </span>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-brand-pink mt-1 shrink-0">
              check_circle
            </span>
            <span>
              <strong>Professional/Specialized:</strong> KES 45,000+ per month for highly trained
              caregivers specializing in newborns or special needs.
            </span>
          </li>
        </ul>

        <blockquote className="border-l-4 border-brand-pink bg-surface-container-low p-8 rounded-r-xl italic text-lg text-on-surface not-prose">
          &ldquo;A fair wage is not just about meeting legal minimums; it&apos;s about securing the
          peace of mind that comes from knowing your child is in the hands of a professional who
          feels valued.&rdquo;
        </blockquote>

        <h2 id="salary-ranges">Beyond the Basic Salary</h2>
        <p>
          When calculating your budget, remember to account for mandatory contributions and benefits
          that are now standard in the Nairobi premium market. This includes{' '}
          <a className="text-brand-pink font-semibold hover:underline underline-offset-4" href="#">
            NHIF and NSSF contributions
          </a>
          , which have seen several structural changes recently.
        </p>

        <div className="not-prose bg-primary-fixed/30 border border-brand-pink/20 rounded-[40px] p-8 flex flex-col md:flex-row items-center gap-6 my-8">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-primary mb-2">Ready to hire?</h3>
            <p className="text-on-surface-variant">
              Browse pre-vetted nannies in Nairobi with verified salary expectations.
            </p>
          </div>
          <PrimaryButton href="/" icon="person_search">
            See real nanny profiles
          </PrimaryButton>
        </div>

        <h2 id="legal">Legal Requirements in 2026</h2>
        <p>
          The Ministry of Labour has introduced stricter enforcement on domestic worker contracts. It
          is no longer optional to have a written agreement that outlines working hours, leave days,
          and termination protocols.
        </p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="p-6 rounded-2xl border border-outline-variant bg-white">
            <h4 className="text-sm font-semibold text-brand-pink mb-2">Work Hours</h4>
            <p className="text-sm text-on-surface-variant">
              Standard 45-hour work week with at least one full day of rest per week.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-outline-variant bg-white">
            <h4 className="text-sm font-semibold text-brand-pink mb-2">Leave Days</h4>
            <p className="text-sm text-on-surface-variant">
              21 working days of annual leave with full pay, plus public holidays.
            </p>
          </div>
        </div>

        <h2 id="hidden-costs">Hidden Costs to Budget For</h2>
        <p>
          Beyond the base salary, factor in these commonly overlooked expenses when budgeting for
          domestic help:
        </p>
        <ul>
          <li>
            <strong>Transport</strong> — If your worker commutes, expect to top up KSh 3,000–5,000
            monthly for matatu fare.
          </li>
          <li>
            <strong>Meals</strong> — Providing lunch (or a lunch allowance of ~KSh 200/day) is
            standard practice.
          </li>
          <li>
            <strong>December Bonus</strong> — While not legally required, a one-month bonus in
            December is deeply expected.
          </li>
        </ul>
      </>
    ),
  },
}

const fallbackArticle: Article = {
  slug: 'article-not-found',
  title: 'Article Coming Soon',
  category: 'Guides',
  categorySlug: 'guides',
  author: 'Sarah Wanjiku',
  authorTitle: 'Senior Research Analyst at MyNanny',
  authorBio:
    'Sarah is the Lead Consultant at MyNanny Kenya. She specializes in family advisory services and has helped over 500 households find the right domestic support.',
  date: '2026',
  readTime: '—',
  image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&auto=format',
  toc: [],
  content: (
    <p>
      This article is currently being written by our editorial team. Check back soon for the full
      content, or browse our other guides below.
    </p>
  ),
}

const relatedArticles = [
  {
    slug: 'nhif-guide-for-domestic-workers',
    title: '5 Signs you have found the perfect nanny for your family',
    category: 'Hiring',
    readTime: '8 min read',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPS3TEiDxzMJsTiRy02kwrgxOB4vEsZGd7hyr0qs--zD03PaycKICFRSDcwkHPaIRJHygSppYLmVjCe6Oi_43PUqsyaNT3VmdcaC_L4fSbMzpDgnOZ6GxePjYZ9Mr-cj7dVN31a_ll4AsLI4m7_QgJRsIklnWyBkNLbo9t_HtKVVwyVY7oj04kquVyBzCs5zcjkaGFES55US_Gj2b2ieLi-RS4WN59-s-dgX7CAG_9AfOOx7PyVGlGqw',
  },
  {
    slug: 'interview-questions-for-nannies',
    title: 'Live-in vs. Live-out: Which is right for your budget?',
    category: 'Pricing',
    readTime: '10 min read',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwUtpsZJBsZ2qfLjuusP0I122z8VBwKUSvtmEqWL_dTM3NrZClQxkclwBNK0PKjFHIc1Ompd0DUF5_Kw8Nl3UrliCOrSo0czVYti8qFFkqOQGVEL4j28oSoMlyDZDZaOOHudFLz4IPQTdl7h0vPc55zcii0-wdMyZUAQadk7lJdn2NBwCAtKmkEHyZZi9cSF_-B7FsnQkrC-61F5XxFFyEd3m1FxPLwqFttfxGCR3SxyowpztI4YLmrQ',
  },
  {
    slug: 'mpesa-payroll-guide',
    title: 'Sample domestic worker contract for 2026',
    category: 'Legal',
    readTime: '5 min read',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_7844G3n3Eadn3B8yyIWBxXj0ld6qZJXbgctEblzsK3Fblybxt8Q6lBJpag3dyDDWRH9DSfkAn_oTmONUIDrLGTzPzNbaKT0Z41BAB4yDTfC3nns7OlblePzmv075YAKHtppdQD7DecxJL4nLkY75GS1YhoZ5tGwk07khmzfbnb4iyj0ztIaog2-NJVORjVMMqibgGVHJeb_OpuD4eZS3e24hKjVV-Llodiaw2gJkb-JJ9ciUmO06Q',
  },
]

const prevArticle = {
  slug: 'interview-questions-for-nannies',
  title: 'How to vet nannies: A 10-step checklist',
}
const nextArticle = {
  slug: 'mpesa-payroll-guide',
  title: 'Safety first: Background checks in Kenya',
}

/* ── Metadata ───────────────────────────────────────────────── */

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  const title = article?.title ?? `${slug.replace(/-/g, ' ')} — Guides`

  return {
    title,
    description: article
      ? `Read our guide: ${article.title}`
      : `Guides and resources from MyNanny.`,
  }
}

/* ── Page ───────────────────────────────────────────────────── */

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const cmsArticle = await getArticleBySlug(slug)

  const article = cmsArticle
    ? {
      slug: cmsArticle.slug,
      title: cmsArticle.title,
      category: cmsArticle.category,
      categorySlug: cmsArticle.category.toLowerCase().replace(/\s+/g, '-'),
      author: cmsArticle.author,
      authorTitle: 'MyNanny Editorial',
      authorBio: 'Expert guides for Nairobi families hiring domestic help.',
      date: '2026',
      readTime: cmsArticle.readTime,
      image: cmsArticle.image ?? fallbackArticle.image,
      toc: [] as { id: string; label: string }[],
      content: (
        <div className="space-y-6">
          {cmsArticle.excerpt && (
            <p className="text-lg leading-relaxed text-on-surface font-medium">{cmsArticle.excerpt}</p>
          )}
          {cmsArticle.body
            ? cmsArticle.body.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="leading-relaxed text-on-surface-variant">
                {para}
              </p>
            ))
            : fallbackArticle.content}
        </div>
      ),
    }
    : { ...(articles[slug] ?? { ...fallbackArticle, slug }) }

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* ── Header ─────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pt-8 pb-12">
        {/* Breadcrumbs */}
        <SectionEntrance delay={0.1}>
          <nav className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant/70 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
            <Link href="/guides" className="hover:text-primary transition-colors">
              Guides
            </Link>
            <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
            <Link
              href={`/guides?category=${article.categorySlug}`}
              className="hover:text-primary transition-colors"
            >
              {article.category}
            </Link>
            <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
            <span className="text-on-surface truncate max-w-[200px]">{article.title}</span>
          </nav>
        </SectionEntrance>

        <SectionEntrance delay={0.2}>
          <header className="mb-8">
            <span className="inline-block bg-primary-fixed text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              {article.category}
            </span>

            <h1 className="text-[36px] md:text-[48px] font-semibold leading-[1.08] tracking-tight mb-6">
              {article.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high border-2 border-white shadow-sm">
                  <img
                    src={AUTHOR_AVATAR}
                    alt={article.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-background">{article.author}</p>
                  <p className="text-xs text-on-surface-variant">
                    {article.date} • {article.readTime}
                  </p>
                </div>
              </div>
              <ShareButtons title={article.title} />
            </div>
          </header>
        </SectionEntrance>

        {/* Hero Image */}
        <SectionEntrance delay={0.3}>
          <div className="double-bezel">
            <div className="double-bezel-inner !p-0 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[1200/630] object-cover"
              />
            </div>
          </div>
        </SectionEntrance>
      </section>

      {/* ── Body + Sidebar ─────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 relative">
          {/* Article body */}
          <SectionEntrance delay={0.4} className="lg:col-span-8">
            <article className="prose prose-lg prose-stone max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand-pink prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:bg-surface-container prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-td:border-b prose-td:border-outline-variant/30">
              {article.content}
            </article>
          </SectionEntrance>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              {/* Table of contents */}
              {article.toc.length > 0 && (
                <div className="p-4 rounded-2xl bg-white border border-outline-variant/30 shadow-sm">
                  <h4 className="text-sm font-semibold text-on-background mb-4 uppercase tracking-wider">
                    Contents
                  </h4>
                  <nav className="space-y-3">
                    {article.toc.map((item, i) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm transition-colors pl-3 border-l-2 ${i === 0
                          ? 'text-brand-pink font-semibold border-brand-pink'
                          : 'text-on-surface-variant hover:text-brand-pink border-transparent'
                          }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* CTA card (dark background) */}
              <div className="rounded-2xl overflow-hidden bg-inverse-surface text-inverse-on-surface p-6 relative group">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors" />
                <h4 className="text-xl font-medium mb-2 relative">Find your perfect nanny</h4>
                <p className="text-surface-variant/70 text-sm mb-6 relative">
                  Safe, secure, and stress-free hiring in Nairobi.
                </p>
                <PrimaryButton href="/" showIcon={false} className="relative w-full justify-center text-sm">
                  See Profiles
                </PrimaryButton>
              </div>

              {/* Small Bio */}
              <div className="p-4 rounded-2xl border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
                    <img
                      src={AUTHOR_AVATAR}
                      alt={article.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold">By {article.author}</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Expert in domestic labor laws and childcare management with 10+ years experience in
                  Kenya{"'"}s domestic sector.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── End Matter ─────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-24">
        <div className="border-t border-outline-variant/30 pt-12">
          {/* Author Bio Card */}
          <SectionEntrance delay={0.1}>
            <div className="double-bezel mb-12">
              <div className="double-bezel-inner flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0">
                  <img
                    src={AUTHOR_AVATAR}
                    alt={article.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-medium text-on-background mb-2">
                    About {article.author}
                  </h4>
                  <p className="text-sm font-semibold text-brand-pink mb-2">{article.authorTitle}</p>
                  <p className="text-on-surface-variant mb-4">{article.authorBio}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <Link
                      href="#"
                      className="text-brand-pink text-sm font-semibold hover:underline"
                    >
                      View Profile
                    </Link>
                    <Link
                      href="/guides"
                      className="text-brand-pink text-sm font-semibold hover:underline"
                    >
                      Read more articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SectionEntrance>

          {/* Previous / Next navigation */}
          <SectionEntrance delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link
                href={`/guides/${prevArticle.slug}`}
                className="p-6 rounded-2xl border border-outline-variant hover:border-brand-pink group transition-all"
              >
                <span className="text-xs text-on-surface-variant flex items-center gap-2 mb-2 uppercase font-medium">
                  <span className="material-symbols-outlined !text-[16px]">arrow_back</span>{' '}
                  Previous
                </span>
                <h5 className="text-sm font-semibold text-on-background group-hover:text-brand-pink transition-colors">
                  {prevArticle.title}
                </h5>
              </Link>
              <Link
                href={`/guides/${nextArticle.slug}`}
                className="p-6 rounded-2xl border border-outline-variant hover:border-brand-pink group transition-all text-right"
              >
                <span className="text-xs text-on-surface-variant flex items-center justify-end gap-2 mb-2 uppercase font-medium">
                  Next{' '}
                  <span className="material-symbols-outlined !text-[16px]">arrow_forward</span>
                </span>
                <h5 className="text-sm font-semibold text-on-background group-hover:text-brand-pink transition-colors">
                  {nextArticle.title}
                </h5>
              </Link>
            </div>
          </SectionEntrance>

          {/* Related Articles */}
          <SectionEntrance delay={0.2}>
            <div className="space-y-8">
              <h3 className="text-2xl font-medium text-on-background">Keep reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((ra) => (
                  <Link key={ra.slug} href={`/guides/${ra.slug}`} className="group block">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-outline-variant/30">
                      <img
                        src={ra.image}
                        alt={ra.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h6 className="text-sm font-semibold text-on-background group-hover:text-brand-pink transition-colors line-clamp-2">
                      {ra.title}
                    </h6>
                  </Link>
                ))}
              </div>
            </div>
          </SectionEntrance>
        </div>
      </section>
    </>
  )
}

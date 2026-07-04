import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Articles } from '@/collections/Articles'
import { Services } from '@/collections/Services'
import { Testimonials } from '@/collections/Testimonials'
import { FAQ } from '@/collections/FAQ'
import { Team } from '@/collections/Team'
import { Timeline } from '@/collections/Timeline'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { Inquiries } from '@/collections/Inquiries'

import { SiteSettings } from '@/globals/SiteSettings'
import { Homepage } from '@/globals/Homepage'
import { Pricing } from '@/globals/Pricing'
import { Coverage } from '@/globals/Coverage'
import { Marketing } from '@/globals/Marketing'
import { AboutPage } from '@/globals/AboutPage'
import { ContactPage } from '@/globals/ContactPage'
import { Legal } from '@/globals/Legal'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Articles, Services, Testimonials, FAQ, Team, Timeline, Media, Inquiries],
  globals: [SiteSettings, Homepage, Pricing, Coverage, Marketing, AboutPage, ContactPage, Legal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})

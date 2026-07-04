import type { GlobalConfig } from 'payload'
import { legalSectionFields } from '@/fields/legal-section-fields'

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Legal Pages',
  fields: [
    {
      type: 'group',
      name: 'terms',
      fields: [
        { name: 'updated', type: 'text', defaultValue: 'July 2026' },
        { name: 'description', type: 'text' },
        { name: 'sections', type: 'array', fields: legalSectionFields },
      ],
    },
    {
      type: 'group',
      name: 'privacy',
      fields: [
        { name: 'updated', type: 'text', defaultValue: 'July 2026' },
        { name: 'description', type: 'text' },
        { name: 'sections', type: 'array', fields: legalSectionFields },
      ],
    },
    {
      type: 'group',
      name: 'disclaimer',
      fields: [
        { name: 'updated', type: 'text', defaultValue: 'July 2026' },
        { name: 'description', type: 'text' },
        { name: 'sections', type: 'array', fields: legalSectionFields },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroImage', type: 'text' },
    { name: 'originStory', type: 'textarea' },
    { name: 'bodyStory', type: 'textarea' },
    { name: 'storyImage', type: 'text' },
    { name: 'mission', type: 'textarea' },
    { name: 'vision', type: 'textarea' },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'impactStats',
      type: 'array',
      fields: [
        { name: 'value', type: 'number', required: true },
        { name: 'suffix', type: 'text' },
        { name: 'label', type: 'text', required: true },
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    { name: 'ctaTitle', type: 'text' },
    { name: 'ctaDescription', type: 'textarea' },
  ],
}

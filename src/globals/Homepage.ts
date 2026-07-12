import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  fields: [
    { name: 'heroEyebrow', type: 'text', defaultValue: 'Most trusted in Kenya and beyond' },
    { name: 'heroHeadline', type: 'text', required: true },
    { name: 'heroSubheadline', type: 'textarea' },
    { name: 'heroCtaText', type: 'text', defaultValue: 'Get Matched Free' },
    { name: 'heroCtaUrl', type: 'text', defaultValue: '#match-form' },
    { name: 'heroImage', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'numericTarget', type: 'number' },
        { name: 'suffix', type: 'text' },
      ],
    },
    {
      name: 'activityMessages',
      type: 'array',
      fields: [{ name: 'message', type: 'text', required: true }],
    },
    {
      name: 'marqueeNeighborhoods',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'marqueeServices',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'aggregateRating', type: 'number', defaultValue: 4.8, min: 0, max: 5 },
    { name: 'reviewCount', type: 'number', defaultValue: 450 },
  ],
}

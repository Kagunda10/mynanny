import type { CollectionConfig } from 'payload'

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'year', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'text' },
    { name: 'order', type: 'number' },
  ],
}

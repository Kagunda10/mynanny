import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'icon', type: 'text' },
    { name: 'basePrice', type: 'number' },
    { name: 'unit', type: 'text' },
    { name: 'popular', type: 'checkbox', defaultValue: false },
    { name: 'tag', type: 'text' },
    { name: 'tagColor', type: 'text' },
    { name: 'image', type: 'text' },
    { name: 'order', type: 'number' },
  ],
}

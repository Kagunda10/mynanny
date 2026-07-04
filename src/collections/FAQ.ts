import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: { useAsTitle: 'question' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'pages',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Homepage', value: 'home' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'How it Works', value: 'how-it-works' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: ['home'],
    },
    { name: 'order', type: 'number' },
  ],
}

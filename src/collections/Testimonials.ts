import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'clientName' },
  fields: [
    { name: 'clientName', type: 'text', required: true },
    { name: 'initials', type: 'text', required: true },
    { name: 'location', type: 'text' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    {
      name: 'colorVariant',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Tertiary', value: 'tertiary' },
      ],
      defaultValue: 'primary',
    },
    { name: 'ownerReply', type: 'textarea' },
    { name: 'featured', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'videoUrl', type: 'text' },
  ],
}

import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['type', 'name', 'email', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Match request', value: 'match' },
        { label: 'Contact form', value: 'contact' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
    { name: 'inquiryType', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'service', type: 'text' },
    { name: 'neighborhood', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
  ],
}

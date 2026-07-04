import type { Field } from 'payload'

export const legalSectionFields: Field[] = [
  { name: 'id', type: 'text', required: true },
  { name: 'title', type: 'text', required: true },
  {
    name: 'paragraphs',
    type: 'array',
    fields: [{ name: 'paragraph', type: 'textarea' }],
  },
  {
    name: 'list',
    type: 'array',
    fields: [{ name: 'item', type: 'text' }],
  },
]

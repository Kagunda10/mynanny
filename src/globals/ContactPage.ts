import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  fields: [
    { name: 'heroTitle', type: 'text' },
    { name: 'heroDescription', type: 'textarea' },
    {
      name: 'intents',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'icon', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'summary', type: 'textarea' },
        {
          name: 'bestChannel',
          type: 'select',
          options: ['whatsapp', 'phone', 'support', 'info', 'form', 'self-serve'],
        },
        { name: 'responseTime', type: 'text' },
        { name: 'actionLabel', type: 'text' },
        { name: 'actionHref', type: 'text' },
        {
          name: 'includeWhenContacting',
          type: 'array',
          fields: [{ name: 'item', type: 'text' }],
        },
      ],
    },
    {
      name: 'slas',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'detail', type: 'text' },
      ],
    },
    {
      name: 'disputeSteps',
      type: 'array',
      fields: [
        { name: 'step', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'refundRules',
      type: 'array',
      fields: [
        { name: 'scenario', type: 'text', required: true },
        { name: 'outcome', type: 'text', required: true },
      ],
    },
    {
      name: 'inquiryTypes',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'selfServiceLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}

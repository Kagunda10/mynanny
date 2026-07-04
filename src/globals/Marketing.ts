import type { GlobalConfig } from 'payload'

export const Marketing: GlobalConfig = {
  slug: 'marketing',
  label: 'Marketing Sections',
  fields: [
    {
      type: 'group',
      name: 'vetting',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Our Rigorous Vetting Process' },
        { name: 'passRate', type: 'text', defaultValue: 'Only 43% of applicants pass.' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'icon', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text', required: true },
            { name: 'isFinal', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'hireSteps',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Hire in four taps.' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaText', type: 'text', defaultValue: 'Get Started Now' },
        { name: 'ctaHref', type: 'text', defaultValue: '#match-form' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text', required: true },
            { name: 'stickyTop', type: 'text', defaultValue: '100px' },
            { name: 'isFinal', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'comparison',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Why parents choose us over bureaus' },
        {
          name: 'columns',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'note', type: 'text', required: true },
            {
              name: 'variant',
              type: 'select',
              options: [
                { label: 'Negative', value: 'negative' },
                { label: 'Highlighted', value: 'highlighted' },
              ],
              defaultValue: 'negative',
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'appCta',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Manage your home from anywhere.' },
        { name: 'description', type: 'textarea' },
        { name: 'appStoreUrl', type: 'text' },
        { name: 'playStoreUrl', type: 'text' },
        { name: 'image', type: 'text' },
      ],
    },
    {
      type: 'group',
      name: 'matchForm',
      fields: [
        { name: 'title', type: 'text', defaultValue: "Let's find your perfect match." },
        { name: 'description', type: 'textarea' },
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
        {
          name: 'serviceOptions',
          type: 'array',
          fields: [{ name: 'label', type: 'text' }],
        },
        { name: 'successMessage', type: 'text', defaultValue: 'Thank you! We will send your matches within 4 hours.' },
      ],
    },
  ],
}

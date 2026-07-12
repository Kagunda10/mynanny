import type { GlobalConfig } from 'payload'

export const Pricing: GlobalConfig = {
  slug: 'pricing',
  label: 'Pricing',
  fields: [
    {
      name: 'tableRows',
      type: 'array',
      label: 'Homepage pricing table',
      fields: [
        { name: 'service', type: 'text', required: true },
        { name: 'bookingFee', type: 'text', required: true },
        { name: 'rate', type: 'text', required: true },
      ],
    },
    {
      name: 'rolePricing',
      type: 'array',
      label: 'Role salary ranges',
      fields: [
        { name: 'role', type: 'text', required: true },
        { name: 'low', type: 'number', required: true },
        { name: 'high', type: 'number', admin: { description: 'Optional upper bound. Leave empty to show “From KES …”' } },
        { name: 'period', type: 'text', defaultValue: '/month' },
        { name: 'note', type: 'text' },
        { name: 'details', type: 'textarea' },
        { name: 'popular', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'feeBreakdown',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Free', value: 'free' },
            { label: 'Fee', value: 'fee' },
            { label: 'Direct payment', value: 'direct' },
          ],
          defaultValue: 'free',
        },
      ],
    },
    { name: 'lastUpdated', type: 'text', defaultValue: 'June - July 2026' },
  ],
}

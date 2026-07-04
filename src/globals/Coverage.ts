import type { GlobalConfig } from 'payload'

export const Coverage: GlobalConfig = {
  slug: 'coverage',
  label: 'Coverage Map',
  fields: [
    {
      name: 'location',
      type: 'group',
      label: 'Map location',
      admin: {
        description: 'Set the map center and zoom for your service area. Move the map by adjusting latitude, longitude, and zoom.',
      },
      fields: [
        {
          name: 'regionLabel',
          type: 'text',
          defaultValue: 'Greater Nairobi',
          admin: { description: 'Label shown on the map (e.g. Greater Nairobi, Mombasa Metro)' },
        },
        {
          name: 'centerLat',
          type: 'number',
          defaultValue: -1.2864,
          required: true,
          admin: { description: 'Map center latitude (e.g. Nairobi: -1.2864)' },
        },
        {
          name: 'centerLng',
          type: 'number',
          defaultValue: 36.8172,
          required: true,
          admin: { description: 'Map center longitude (e.g. Nairobi: 36.8172)' },
        },
        {
          name: 'zoom',
          type: 'number',
          defaultValue: 11,
          min: 8,
          max: 16,
          admin: { description: 'Initial zoom level (8 = wide region, 14 = neighborhood)' },
        },
      ],
    },
    {
      name: 'section',
      type: 'group',
      label: 'Section copy',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'Nairobi coverage',
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Workers near every Nairobi home.',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          defaultValue:
            'Tap a neighborhood to see how many vetted workers are active nearby. We match you with people who already know your area.',
        },
      ],
    },
    {
      name: 'neighborhoods',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'workers', type: 'number', required: true },
        {
          name: 'latitude',
          type: 'number',
          required: true,
          admin: { description: 'Pin latitude (find on Google Maps → right-click → copy coordinates)' },
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
          admin: { description: 'Pin longitude' },
        },
        {
          name: 'popularServices',
          type: 'array',
          fields: [{ name: 'service', type: 'text' }],
        },
      ],
    },
    { name: 'totalWorkers', type: 'number', defaultValue: 1475 },
    { name: 'avgMatchHours', type: 'number', defaultValue: 48 },
  ],
}

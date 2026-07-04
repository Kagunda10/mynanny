import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'body', type: 'textarea', admin: { description: 'Plain text or HTML body content' } },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text', admin: { description: 'External image URL if not using upload' } },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Hiring Guide', value: 'Hiring Guide' },
        { label: 'Pricing', value: 'Pricing' },
        { label: 'Legal', value: 'Legal' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Interviews', value: 'Interviews' },
        { label: 'News', value: 'News' },
      ],
    },
    { name: 'author', type: 'text' },
    { name: 'readTime', type: 'text', defaultValue: '5 min read' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
}

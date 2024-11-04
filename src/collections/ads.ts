import type { CollectionConfig } from 'payload/types'

const Ads: CollectionConfig = {
  slug: 'ads',
  labels: {
    singular: 'Anúncio',
    plural: 'Anúncios',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título do Anúncio',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Conteúdo do Anúncio',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Mídia do Anúncio',
      required: true,
    },
    {
      name: 'campaign',
      type: 'relationship',
      relationTo: 'campaigns',
      label: 'Campanha',
      required: true,
    },
    {
      name: 'platform',
      type: 'select',
      options: [
        { label: 'Google Ads', value: 'google-ads' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
      ],
      label: 'Plataforma',
      required: true,
    },
  ],
}

export default Ads

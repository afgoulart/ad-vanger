import type { CollectionConfig } from 'payload/types'

const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  labels: {
    singular: 'Campanha',
    plural: 'Campanhas',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título da Campanha',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      label: 'Cliente',
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
      required: true,
      label: 'Plataforma de Anúncio',
    },
    {
      name: 'budget',
      type: 'number',
      label: 'Orçamento',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Data de Início',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Data de Fim',
    },
    {
      name: 'ads',
      type: 'relationship',
      relationTo: 'ads',
      hasMany: true,
      label: 'Anúncios',
    },
  ],
}

export default Campaigns

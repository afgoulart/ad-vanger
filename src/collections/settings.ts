import type { CollectionConfig } from 'payload/types'

const Settings: CollectionConfig = {
  slug: 'settings',
  labels: {
    singular: 'Configuração do Serviço',
    plural: 'Configurações dos Serviços',
  },
  access: {
    read: () => true, // Configurar permissões adequadas
    update: ({ req: { user } }) => !!user, // Apenas usuários logados podem editar
  },
  fields: [
    {
      name: 'googleAdsConfig',
      type: 'group',
      label: 'Google Ads Configurações',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Habilitar Google Ads',
        },
        {
          name: 'apiKey',
          type: 'text',
          label: 'Google Ads API Key',
          admin: {
            condition: (data: any) => data.googleAdsConfig?.enabled,
          },
        },
        {
          name: 'customerId',
          type: 'text',
          label: 'Customer ID',
          admin: {
            condition: (data: any) => data.googleAdsConfig?.enabled,
          },
        },
        {
          name: 'adGroupId',
          type: 'text',
          label: 'Ad Group ID',
          admin: {
            condition: (data: any) => data.googleAdsConfig?.enabled,
          },
        },
      ],
    },
    {
      name: 'instagramConfig',
      type: 'group',
      label: 'Instagram Configurações',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Habilitar Instagram Ads',
        },
        {
          name: 'apiKey',
          type: 'text',
          label: 'Instagram API Key',
          admin: {
            condition: (data: any) => data.instagramConfig?.enabled,
          },
        },
        {
          name: 'accountId',
          type: 'text',
          label: 'Account ID',
          admin: {
            condition: (data: any) => data.instagramConfig?.enabled,
          },
        },
      ],
    },
    {
      name: 'tiktokConfig',
      type: 'group',
      label: 'TikTok Configurações',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Habilitar TikTok Ads',
        },
        {
          name: 'apiKey',
          type: 'text',
          label: 'TikTok API Key',
          admin: {
            condition: (data: any) => data.tiktokConfig?.enabled,
          },
        },
        {
          name: 'adAccountId',
          type: 'text',
          label: 'Ad Account ID',
          admin: {
            condition: (data: any) => data.tiktokConfig?.enabled,
          },
        },
      ],
    },
  ],
}

export default Settings

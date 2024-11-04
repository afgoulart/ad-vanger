import { AdAccount } from 'facebook-nodejs-business-sdk'

import type { InstagramConfig } from './config'

interface InstagramAdData {
  title: string
  content: string
  media: string
}

// Função para criar um anúncio no Instagram usando as configurações carregadas
export const createInstagramAd = async (
  adData: InstagramAdData,
  config: InstagramConfig,
): Promise<unknown> => {
  const { title, content, media } = adData

  const response = await fetch(
    `${config.apiUrl}/${config.accountId}/ads`, // Endpoint de criação de anúncio no Instagram
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        name: title,
        body: content,
        media_url: media,
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Falha ao criar o anúncio no Instagram: ${errorText}`)
  }

  return await response.json()
}

export const getInstagramMetrics = async (
  campaign: any,
  config: InstagramConfig,
): Promise<unknown> => {
  const adAccount = new AdAccount(config.accountId)
  adAccount.setAccessToken(config.apiKey)

  const insights = await adAccount.getInsights(['impressions', 'clicks', 'spend'], {
    time_range: { since: '2023-01-01', until: '2023-12-31' },
  })

  return insights[0] || {}
}

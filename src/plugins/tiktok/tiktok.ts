import type { TikTokConfig } from './config'

interface TikTokAdData {
  title: string
  content: string
  media: string
}

// Função para criar um anúncio no TikTok usando as configurações carregadas
export const createTikTokAd = async (
  adData: TikTokAdData,
  config: TikTokConfig,
): Promise<unknown> => {
  const { title, content, media } = adData

  const response = await fetch(
    `${config.apiUrl}/advertiser/ad/create`, // Endpoint de criação de anúncio
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        advertiser_id: config.adAccountId,
        ad: {
          title,
          content,
          mediaFile: media,
        },
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Falha ao criar o anúncio no TikTok: ${errorText}`)
  }

  return await response.json()
}

export const getTikTokMetrics = async (campaign: any, config: TikTokConfig): Promise<unknown> => {
  const response = await fetch(
    `https://business-api.tiktok.com/open_api/v1.2/advertiser/insights/get/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        advertiser_id: config.adAccountId,
        metrics: ['impressions', 'clicks', 'spend'],
        date_range: { start_date: '2023-01-01', end_date: '2023-12-31' },
      }),
    },
  )

  const data = await response.json()
  return data?.data?.list?.[0] || {}
}

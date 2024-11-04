import { GoogleAdsApi } from 'google-ads-api'

import type { GoogleAdsConfig } from './config'
export interface GoogleAdData {
  title: string
  content: string
  media: string
}

export const createGoogleAd = async (
  adData: GoogleAdData,
  config: GoogleAdsConfig,
): Promise<unknown> => {
  const { title, content, media } = adData

  const response = await fetch(
    `${config.apiUrl}/customers/${config.customerId}/adGroups/${config.adGroupId}/ads`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        ad: {
          adType: 'TEXT_AD',
          headline: title,
          description: content,
          mediaFile: media,
        },
      }),
    },
  )

  if (!response.ok) {
    throw new Error('Falha ao criar o anúncio no Google Ads')
  }

  return await response.json()
}

export const getGoogleAdsMetrics = async (
  campaign: any,
  config: GoogleAdsConfig,
): Promise<unknown> => {
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
  })

  const customer = client.Customer({
    customer_id: config.customerId,
    login_customer_id: config.customerId,
    refresh_token: '100',
  })

  const query = `
    SELECT
      campaign.id,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros
    FROM
      campaign
    WHERE
      campaign.id = ${campaign.campaignId}
  `

  const results = await customer.query(query)

  // Retorna a primeira linha de resultados (assumindo uma campanha única)
  return results[0] || {}
}

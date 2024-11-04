import type { Payload } from 'payload'

import { getGoogleAdsConfig } from '../plugins/googleAds/config'
import { getGoogleAdsMetrics } from '../plugins/googleAds/googleAds'
import { getInstagramMetrics } from '../plugins/instagram/instagram'
import { getTikTokMetrics } from '../plugins/tiktok/tiktok'

export default async function getCampaignsWithMetrics(payload: Payload) {
  try {
    // Buscar campanhas do PayloadCMS
    const campaigns = await payload.find({ collection: 'campaigns', limit: 100 })
    const enrichedCampaigns = await Promise.all(
      campaigns.docs.map(async campaign => {
        let metrics

        // Obter dados dinâmicos de acordo com a plataforma de anúncios
        switch (campaign.platform) {
          case 'google-ads':
            const googleConfig = await getGoogleAdsConfig(payload)
            metrics = await getGoogleAdsMetrics(campaign)
            break
          case 'instagram':
            metrics = await getInstagramMetrics(campaign)
            break
          case 'tiktok':
            metrics = await getTikTokMetrics(campaign)
            break
          default:
            metrics = { message: 'Plataforma não suportada' }
        }

        return {
          ...campaign,
          metrics,
        }
      }),
    )

    return enrichedCampaigns
  } catch (error) {
    payload.logger.error('Erro ao buscar campanhas com métricas', { cause: error })
    throw new Error('Erro ao buscar campanhas com métricas')
  }
}

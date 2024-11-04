import type { Payload } from 'payload'

import { getGoogleAdsConfig } from '../plugins/googleAds/config'
import { createGoogleAd } from '../plugins/googleAds/googleAds'
import { getInstagramConfig } from '../plugins/instagram/config'
import { createInstagramAd } from '../plugins/instagram/instagram'
import { getTikTokConfig } from '../plugins/tiktok/config'
import { createTikTokAd } from '../plugins/tiktok/tiktok'

interface SettingsProps {
  googleAdsConfig?: {
    enabled: boolean
    apiKey: string
    customerId: string
    adGroupId: string
  }
  instagramConfig?: {
    enabled: boolean
    apiKey: string
    accountId: string
  }
  tiktokConfig?: {
    enabled: boolean
    apiKey: string
    adAccountId: string
  }
}

const getEnabledServices = async (payload: Payload): Promise<any[]> => {
  const settings: { docs: SettingsProps[] } = await (payload.find({
    collection: 'settings',
    limit: 1,
  }) as Promise<any>)

  const configs = settings?.docs?.[0]
  const enabledServices = []

  if (configs?.googleAdsConfig?.enabled) {
    const googleConfig = getGoogleAdsConfig(configs)
    enabledServices.push({
      name: 'Google Ads',
      createAd: adData => createGoogleAd(adData, googleConfig),
    })
  }

  if (configs?.instagramConfig?.enabled) {
    const instagramConfig = getInstagramConfig(configs)
    enabledServices.push({
      name: 'Instagram',
      createAd: adData => createInstagramAd(adData, instagramConfig),
    })
  }

  if (configs?.tiktokConfig?.enabled) {
    const tiktokConfig = getTikTokConfig(configs)
    enabledServices.push({
      name: 'TikTok',
      createAd: adData => createTikTokAd(adData, tiktokConfig),
    })
  }

  return enabledServices
}

export default getEnabledServices

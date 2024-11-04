export interface TikTokConfig {
  apiKey: string
  adAccountId: string
  apiUrl: string
}

export const getTikTokConfig = (settings): TikTokConfig => {
  if (!settings.tiktokConfig?.enabled) {
    throw new Error('TikTok Ads não está habilitado nas configurações.')
  }

  return {
    apiKey: settings.tiktokConfig.apiKey,
    adAccountId: settings.tiktokConfig.adAccountId,
    apiUrl: 'https://business-api.tiktok.com/open_api/v1.2',
  }
}

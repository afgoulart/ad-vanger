export interface GoogleAdsConfig {
  apiKey: string
  customerId: string
  adGroupId: string
  apiUrl: string
}

export const getGoogleAdsConfig = (settings): GoogleAdsConfig => {
  if (!settings.googleAdsConfig?.enabled) {
    throw new Error('Google Ads não está habilitado nas configurações.')
  }

  return {
    apiKey: settings.googleAdsConfig.apiKey,
    customerId: settings.googleAdsConfig.customerId,
    adGroupId: settings.googleAdsConfig.adGroupId,
    apiUrl: 'https://googleads.googleapis.com/v10',
  }
}

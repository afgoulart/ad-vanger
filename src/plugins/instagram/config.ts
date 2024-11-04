export interface InstagramConfig {
  apiKey: string
  accountId: string
  apiUrl: string
}

export const getInstagramConfig = (settings): InstagramConfig => {
  if (!settings.instagramConfig?.enabled) {
    throw new Error('Instagram Ads não está habilitado nas configurações.')
  }

  return {
    apiKey: settings.instagramConfig.apiKey,
    accountId: settings.instagramConfig.accountId,
    apiUrl: 'https://graph.facebook.com/v12.0',
  }
}

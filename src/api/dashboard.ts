import { PayloadRequest } from 'payload/types'

export interface responseData {
  clientsCount: number
  campaignsCount: number
  adsCount: number
  totalBudget: number
  platformCounts: {
    [platform: string]: number
  }
}

export default async function dashboardData(req: PayloadRequest, res): Promise<void> {
  const payload = req.payload

  try {
    // Contagem total de clientes
    const clientsCount = await payload.count<any>({ collection: 'clients' })

    // Contagem total de campanhas
    const campaignsCount = await payload.count<any>({ collection: 'campaigns' })

    // Contagem total de anúncios
    const adsCount = await payload.count<any>({ collection: 'ads' })

    // Dados das campanhas (exemplo: orçamento total e número de campanhas por plataforma)
    const campaigns = await payload.find<any>({ collection: 'campaigns', limit: 100 })

    const totalBudget = campaigns.docs.reduce((sum, campaign) => sum + campaign.budget, 0)

    const platformCounts = campaigns.docs.reduce((acc, campaign) => {
      acc[campaign.platform] = (acc[campaign.platform] || 0) + 1
      return acc
    }, {})

    res.status(200).json({
      clientsCount,
      campaignsCount,
      adsCount,
      totalBudget,
      platformCounts,
    })
  } catch (error: unknown) {
    payload.logger.error('Erro ao carregar os dados do dashboard', { cause: error })
    res.status(500).json({ error: 'Erro ao carregar os dados do dashboard' })
  }
}

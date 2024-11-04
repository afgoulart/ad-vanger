import type { CollectionConfig } from 'payload/types'

const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: 'Cliente',
    plural: 'Clientes',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome do Cliente',
      required: true,
    },
    {
      name: 'campaigns',
      type: 'relationship',
      relationTo: 'campaigns',
      hasMany: true,
      label: 'Campanhas',
    },
  ],
}

export default Clients

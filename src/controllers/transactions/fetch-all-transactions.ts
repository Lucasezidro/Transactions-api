import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllTransactions } from '../../factories/transactions/make-fetch-all-transactions'

export async function fetchTransactionsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/transactions/:userId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'find a transaction by id',
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params

      const fetchTransactions = await makeFetchAllTransactions()

      const { transactions } = await fetchTransactions.execute({
        userId,
      })

      return { transactions }
    },
  )
}

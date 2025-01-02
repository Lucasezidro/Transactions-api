import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllTransactions } from '../../factories/transactions/make-fetch-all-transactions'
import { prisma } from '../../lib/prisma'

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
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(100).default(10),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params
      const { page, perPage } = request.query

      const fetchTransactions = await makeFetchAllTransactions()

      const { transactions } = await fetchTransactions.execute({
        userId,
        page,
        perPage,
      })

      const totalCount = await prisma.transaction.count({
        where: { userId },
      })

      return { transactions, totalCount }
    },
  )
}

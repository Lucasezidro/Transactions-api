import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFindTransactionById } from '../../factories/transactions/make-find-transaction-by-id'

export async function findTransactionByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/find/transaction/:transactionId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'find a transaction by id',
        params: z.object({
          transactionId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { transactionId } = request.params

      const findTransaction = await makeFindTransactionById()

      const { transaction } = await findTransaction.execute({
        transactionId,
      })

      return { transaction }
    },
  )
}

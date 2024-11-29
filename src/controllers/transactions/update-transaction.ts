import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateTransaction } from '../../factories/transactions/make-update-transaction'

export async function updateTransactionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/transaction/:transactionId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Updates a new transaction',
        params: z.object({
          transactionId: z.string().uuid(),
        }),
        body: z.object({
          transactionName: z.string(),
          isIncome: z.boolean(),
          description: z.string(),
          amount: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { transactionName, description, amount, isIncome } = request.body

      const { transactionId } = request.params

      const updateTransaction = await makeUpdateTransaction()

      await updateTransaction.execute({
        transactionName,
        description,
        isIncome,
        amount,
        transactionId,
      })

      return reply.status(204).send()
    },
  )
}

import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteTransaction } from '../../factories/transactions/make-delete-transaction'

export async function deleteTransactionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/transaction/:transactionId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Deletes a new transaction',
        params: z.object({
          transactionId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { transactionId } = request.params

      const deleteTransaction = await makeDeleteTransaction()

      await deleteTransaction.execute({
        transactionId,
      })

      return reply.status(204).send()
    },
  )
}

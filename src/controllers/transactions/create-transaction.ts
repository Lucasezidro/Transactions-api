import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateTransaction } from '../../factories/transactions/make-create-transaction'

export async function createTransactionController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/transaction/:userId',
    {
      schema: {
        tags: ['transactions'],
        summary: 'Creates a new transaction',
        params: z.object({
          userId: z.string().uuid(),
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

      const { userId } = request.params

      const createTransaction = await makeCreateTransaction()

      await createTransaction.execute({
        transactionName,
        description,
        isIncome,
        amount,
        userId,
      })

      return reply.status(201).send()
    },
  )
}

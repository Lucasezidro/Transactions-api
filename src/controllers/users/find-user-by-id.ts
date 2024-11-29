import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFindUserById } from '../../factories/users/make-find-user-by-id'

export async function findUserByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/find/user/:userId',
    {
      schema: {
        tags: ['users'],
        summary: 'find a user by id',
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params

      const updateUser = await makeFindUserById()

      const { user } = await updateUser.execute({
        userId,
      })

      return { user }
    },
  )
}

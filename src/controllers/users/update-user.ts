import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateUser } from '../../factories/users/make-update-user'

export async function updateUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/user/:userId',
    {
      schema: {
        tags: ['users'],
        summary: 'Updates a new user',
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body
      const { userId } = request.params

      const updateUser = await makeUpdateUser()

      await updateUser.execute({
        name,
        email,
        password,
        userId,
      })

      return reply.status(201).send()
    },
  )
}

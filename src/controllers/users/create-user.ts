import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateUser } from '../../factories/users/make-create-user'

export async function createUserController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/user',
    {
      schema: {
        tags: ['users'],
        summary: 'Creates a new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const createUser = await makeCreateUser()

      await createUser.execute({
        name,
        email,
        password,
      })

      return reply.status(201).send()
    },
  )
}

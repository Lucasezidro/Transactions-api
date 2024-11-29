import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeAuthenticate } from '../../factories/users/make-authenticate'

export async function authenticateController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/user/auth',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate a user',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const auth = await makeAuthenticate()

      const { user } = await auth.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return { token, user }
    },
  )
}

import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateBooking } from '../../factories/bookings/make-create-booking'

import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')
dayjs.extend(utc)

export async function createBookingController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/booking/:userId',
    {
      schema: {
        tags: ['bookings'],
        summary: 'Creates a new booking',
        params: z.object({
          userId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          description: z.string(),
          amount: z.coerce.number(),
          isIncome: z.boolean(),
          status: z
            .enum(['schedulling', 'processing', 'finished'])
            .default('schedulling'),
          endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: 'Invalid date format.',
          }),
        }),
      },
    },
    async (request, reply) => {
      const { title, description, status, endDate, amount, isIncome } =
        request.body

      const { userId } = request.params

      const createBooking = await makeCreateBooking()

      await createBooking.execute({
        title,
        description,
        status,
        amount,
        isIncome,
        endDate: new Date(endDate),
        userId,
      })

      return reply.status(201).send()
    },
  )
}

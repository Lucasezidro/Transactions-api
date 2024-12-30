import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateBooking } from '../../factories/bookings/make-update-booking'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/pt-br'
dayjs.locale('pt-br')
dayjs.extend(utc)

export async function updateBookingController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/booking/:bookingId',
    {
      schema: {
        tags: ['bookings'],
        summary: 'Updates a new booking',
        params: z.object({
          bookingId: z.string().uuid(),
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
      const { title, description, status, amount, isIncome, endDate } =
        request.body

      const { bookingId } = request.params

      const updateBooking = await makeUpdateBooking()

      await updateBooking.execute({
        title,
        description,
        status,
        amount,
        isIncome,
        endDate: new Date(endDate),
        bookingId,
      })

      return reply.status(201).send()
    },
  )
}

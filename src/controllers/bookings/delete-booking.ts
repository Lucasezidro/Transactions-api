import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteBooking } from '../../factories/bookings/make-delete-booking'

export async function deleteBookingController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/booking/:bookingId',
    {
      schema: {
        tags: ['bookings'],
        summary: 'Deletes a new booking',
        params: z.object({
          bookingId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { bookingId } = request.params

      const deleteBooking = await makeDeleteBooking()

      await deleteBooking.execute({
        bookingId,
      })

      return reply.status(204).send()
    },
  )
}

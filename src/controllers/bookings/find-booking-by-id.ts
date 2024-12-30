import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFindBookingById } from '../../factories/bookings/make-find-booking-by-id'

export async function findBookingByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/find/booking/:bookingId',
    {
      schema: {
        tags: ['bookings'],
        summary: 'find a booking by id',
        params: z.object({
          bookingId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { bookingId } = request.params

      const deleteBooking = await makeFindBookingById()

      const { booking } = await deleteBooking.execute({
        bookingId,
      })

      return { booking }
    },
  )
}

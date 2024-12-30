import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllBookings } from '../../factories/bookings/make-fetch-all-bookings'

export async function fetchAllBookingsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/bookings/:userId',
    {
      schema: {
        tags: ['bookings'],
        summary: 'fetch all bookings by id',
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params

      const fetchBookings = await makeFetchAllBookings()

      const { bookings } = await fetchBookings.execute({
        userId,
      })

      return { bookings }
    },
  )
}

import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllBookings } from '../../factories/bookings/make-fetch-all-bookings'
import { prisma } from '../../lib/prisma'

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
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
          perPage: z.coerce.number().min(1).max(100).default(10),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params
      const { page, perPage } = request.query

      const fetchBookings = await makeFetchAllBookings()

      const { bookings } = await fetchBookings.execute({
        userId,
        page,
        perPage,
      })

      const totalCount = await prisma.booking.count({
        where: { userId },
      })

      return { bookings, totalCount }
    },
  )
}

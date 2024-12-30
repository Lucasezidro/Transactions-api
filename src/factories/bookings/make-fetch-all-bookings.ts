import { PrismaBookingsRepository } from '../../repositories/bookings/prisma/prisma-bookings-repository'
import { FetchAllBookingsUseCase } from '../../use-cases/bookings/use-cases/fetch-all-bookings'

export async function makeFetchAllBookings() {
  const bookingsRepository = new PrismaBookingsRepository()
  const fetchAllBookingsUseCase = new FetchAllBookingsUseCase(
    bookingsRepository,
  )

  return fetchAllBookingsUseCase
}

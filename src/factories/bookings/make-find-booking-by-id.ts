import { PrismaBookingsRepository } from '../../repositories/bookings/prisma/prisma-bookings-repository'
import { FindBookingByIdUseCase } from '../../use-cases/bookings/use-cases/find-booking-by-id'

export async function makeFindBookingById() {
  const bookingsRepository = new PrismaBookingsRepository()
  const findBookingByIdUseCase = new FindBookingByIdUseCase(bookingsRepository)

  return findBookingByIdUseCase
}

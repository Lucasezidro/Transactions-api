import { PrismaBookingsRepository } from '../../repositories/bookings/prisma/prisma-bookings-repository'
import { CreateBookingUseCase } from '../../use-cases/bookings/use-cases/create-booking'

export async function makeCreateBooking() {
  const bookingsRepository = new PrismaBookingsRepository()
  const createBookingsUseCase = new CreateBookingUseCase(bookingsRepository)

  return createBookingsUseCase
}

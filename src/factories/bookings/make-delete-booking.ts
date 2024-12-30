import { PrismaBookingsRepository } from '../../repositories/bookings/prisma/prisma-bookings-repository'
import { DeleteBookingUseCase } from '../../use-cases/bookings/use-cases/delete-booking'

export async function makeDeleteBooking() {
  const bookingsRepository = new PrismaBookingsRepository()
  const deleteBookingsUseCase = new DeleteBookingUseCase(bookingsRepository)

  return deleteBookingsUseCase
}

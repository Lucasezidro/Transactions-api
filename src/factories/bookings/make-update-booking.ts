import { PrismaBookingsRepository } from '../../repositories/bookings/prisma/prisma-bookings-repository'
import { PrismaTransactionsRepository } from '../../repositories/transactions/prisma/prisma-transactions-repository'
import { UpdateBookingUseCase } from '../../use-cases/bookings/use-cases/update-booking'

export async function makeUpdateBooking() {
  const bookingsRepository = new PrismaBookingsRepository()
  const transactionsRepository = new PrismaTransactionsRepository()
  const updateBookingsUseCase = new UpdateBookingUseCase(
    bookingsRepository,
    transactionsRepository,
  )

  return updateBookingsUseCase
}

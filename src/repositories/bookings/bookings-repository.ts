import type { Booking, Prisma } from '@prisma/client'

export interface BookingsRepository {
  create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking>
  update(booking: Booking): Promise<Booking>
  delete(booking: Booking): Promise<void>

  findById(bookingId: string): Promise<Booking | null>
  fetchAll(userId: string): Promise<Booking[]>
}

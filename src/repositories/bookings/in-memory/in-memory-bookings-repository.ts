import type { Prisma, Booking } from '@prisma/client'
import type { BookingsRepository } from '../bookings-repository'

export class InMemoryBookingsRepository implements BookingsRepository {
  public bookings: Booking[] = []

  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    const booking = {
      id: 'booking-id',
      title: data.title,
      description: data.description,
      status: data.status ?? 'schedulling',
      endDate: new Date(data.endDate),
      amount: data.amount,
      isIncome: data.isIncome,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.bookings.push(booking)

    return booking
  }

  async update(data: Booking): Promise<Booking> {
    const indexBooking = this.bookings.findIndex((item) => item.id === data.id)

    if (indexBooking >= 0) {
      this.bookings[indexBooking] = {
        ...data,
        endDate: new Date(data.endDate),
      }
    }

    return data
  }

  async delete(data: Booking): Promise<void> {
    const indexBooking = this.bookings.findIndex((item) => item.id === data.id)

    this.bookings.splice(indexBooking, 1)
  }

  async findById(bookingId: string): Promise<Booking | null> {
    const booking = this.bookings.find((item) => item.id === bookingId)

    if (!booking) {
      return null
    }

    return {
      ...booking,
      endDate: new Date(booking.endDate),
    }
  }

  async fetchAll(userId: string): Promise<Booking[]> {
    const bookings = this.bookings.filter((item) => item.userId === userId)

    return bookings
  }
}

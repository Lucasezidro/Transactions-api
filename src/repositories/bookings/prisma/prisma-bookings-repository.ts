import { prisma } from './../../../lib/prisma'
import type { Prisma, Booking } from '@prisma/client'
import type { BookingsRepository } from '../bookings-repository'

export class PrismaBookingsRepository implements BookingsRepository {
  async create(data: Prisma.BookingUncheckedCreateInput): Promise<Booking> {
    const booking = await prisma.booking.create({
      data,
    })

    return booking
  }

  async update(data: Booking): Promise<Booking> {
    const booking = await prisma.booking.update({
      where: {
        id: data.id,
      },
      data,
    })

    return booking
  }

  async delete(data: Booking): Promise<void> {
    await prisma.booking.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(bookingId: string): Promise<Booking | null> {
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
    })

    return booking
  }

  async fetchAll(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Booking[]> {
    return await prisma.booking.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })
  }
}

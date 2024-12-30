import type { Booking } from '@prisma/client'
import type { BookingsRepository } from '../../../repositories/bookings/bookings-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface FindBookingByIdRequest {
  bookingId: string
}

interface FindBookingByIdResponse {
  booking: Booking
}

export class FindBookingByIdUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({
    bookingId,
  }: FindBookingByIdRequest): Promise<FindBookingByIdResponse> {
    const booking = await this.bookingsRepository.findById(bookingId)

    if (!booking) {
      throw new BadRequestError()
    }

    return { booking }
  }
}

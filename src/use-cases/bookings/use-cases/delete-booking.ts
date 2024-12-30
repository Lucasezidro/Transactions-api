import type { BookingsRepository } from '../../../repositories/bookings/bookings-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface DeleteBookingRequest {
  bookingId: string
}

export class DeleteBookingUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({ bookingId }: DeleteBookingRequest): Promise<void> {
    const booking = await this.bookingsRepository.findById(bookingId)

    if (!booking) {
      throw new BadRequestError()
    }

    await this.bookingsRepository.delete(booking)
  }
}

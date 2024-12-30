import type { Booking } from '@prisma/client'
import type { BookingsRepository } from '../../../repositories/bookings/bookings-repository'

interface FetchAllBookingsRequest {
  userId: string
}

interface FetchAllBookingsResponse {
  bookings: Booking[]
}

export class FetchAllBookingsUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({
    userId,
  }: FetchAllBookingsRequest): Promise<FetchAllBookingsResponse> {
    const bookings = await this.bookingsRepository.fetchAll(userId)

    return { bookings }
  }
}

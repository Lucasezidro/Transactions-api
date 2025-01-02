import type { Booking } from '@prisma/client'
import type { BookingsRepository } from '../../../repositories/bookings/bookings-repository'

interface FetchAllBookingsRequest {
  userId: string
  page: number
  perPage: number
}

interface FetchAllBookingsResponse {
  bookings: Booking[]
}

export class FetchAllBookingsUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({
    userId,
    page,
    perPage,
  }: FetchAllBookingsRequest): Promise<FetchAllBookingsResponse> {
    const bookings = await this.bookingsRepository.fetchAll(
      userId,
      page,
      perPage,
    )

    return { bookings }
  }
}

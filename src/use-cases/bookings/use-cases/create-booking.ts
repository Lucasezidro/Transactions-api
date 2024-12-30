import type { $Enums, Booking } from '@prisma/client'
import type { BookingsRepository } from '../../../repositories/bookings/bookings-repository'

interface CreateBookingRequest {
  title: string
  description: string
  endDate: Date
  amount: number
  isIncome: boolean
  status: $Enums.BookingStatus
  userId: string
}

interface CreateBookingResponse {
  booking: Booking
}

export class CreateBookingUseCase {
  constructor(private bookingsRepository: BookingsRepository) {}

  async execute({
    title,
    description,
    endDate,
    status,
    amount,
    isIncome,
    userId,
  }: CreateBookingRequest): Promise<CreateBookingResponse> {
    const booking = await this.bookingsRepository.create({
      title,
      description,
      endDate,
      status,
      amount,
      isIncome,
      userId,
    })

    return { booking }
  }
}

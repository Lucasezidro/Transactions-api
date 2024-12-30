import type { $Enums, Booking } from '@prisma/client'
import type { BookingsRepository } from '../../../repositories/bookings/bookings-repository'
import { BadRequestError } from '../errors/bad-request-error'
import { TransactionsRepository } from '../../../repositories/transactions/transactions-repository'

interface UpdateBookingRequest {
  title: string
  description: string
  endDate: Date
  amount: number
  isIncome: boolean
  status: $Enums.BookingStatus
  bookingId: string
}

interface UpdateBookingResponse {
  booking: Booking
}

export class UpdateBookingUseCase {
  constructor(
    private bookingsRepository: BookingsRepository,
    private transactionsRepoitory: TransactionsRepository,
  ) {}

  async execute({
    title,
    description,
    endDate,
    status,
    amount,
    isIncome,
    bookingId,
  }: UpdateBookingRequest): Promise<UpdateBookingResponse> {
    const booking = await this.bookingsRepository.findById(bookingId)

    if (!booking) {
      throw new BadRequestError()
    }

    booking.title = title
    booking.description = description
    booking.status = status
    booking.amount = amount
    booking.isIncome = isIncome
    booking.endDate = endDate

    if (status === 'finished') {
      await this.transactionsRepoitory.create({
        amount,
        isIncome,
        description,
        transactionName: title,
        userId: booking.userId,
      })
    }

    await this.bookingsRepository.update(booking)

    return { booking }
  }
}

import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { UpdateBookingUseCase } from '../use-cases/update-booking'
import { InMemoryBookingsRepository } from '../../../repositories/bookings/in-memory/in-memory-bookings-repository'
import { InMemoryTransactionsRepository } from '../../../repositories/transactions/in-memory/in-memory-transactions-repository'

let usersRepository: InMemoryUsersRepository
let transactionsRepository: InMemoryTransactionsRepository

let bookingRepository: InMemoryBookingsRepository
let sut: UpdateBookingUseCase

describe('Update Booking', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    transactionsRepository = new InMemoryTransactionsRepository()

    bookingRepository = new InMemoryBookingsRepository()
    sut = new UpdateBookingUseCase(bookingRepository, transactionsRepository)
  })

  it('should be able to update booking', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const newBooking = await bookingRepository.create({
      title: 'Entrega terça feira',
      description: 'Sistema de software cosméticos.',
      amount: 10,
      isIncome: true,
      endDate: new Date(),
      status: 'processing',
      userId: user.id,
    })

    const { booking } = await sut.execute({
      title: newBooking.title,
      description: newBooking.description,
      amount: newBooking.amount,
      isIncome: newBooking.isIncome,
      endDate: newBooking.endDate,
      status: 'finished',
      bookingId: newBooking.id,
    })

    expect(booking.status).toEqual('finished')
    expect(transactionsRepository.transactions).toHaveLength(1)
  })
})

import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { FindBookingByIdUseCase } from '../use-cases/find-booking-by-id'
import { InMemoryBookingsRepository } from '../../../repositories/bookings/in-memory/in-memory-bookings-repository'

let usersRepository: InMemoryUsersRepository

let bookingRepository: InMemoryBookingsRepository
let sut: FindBookingByIdUseCase

describe('Update Booking', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    bookingRepository = new InMemoryBookingsRepository()
    sut = new FindBookingByIdUseCase(bookingRepository)
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
      endDate: new Date(),
      status: 'processing',
      userId: user.id,
    })

    const { booking } = await sut.execute({
      bookingId: newBooking.id,
    })

    expect(booking.title).toEqual('Entrega terça feira')
  })
})

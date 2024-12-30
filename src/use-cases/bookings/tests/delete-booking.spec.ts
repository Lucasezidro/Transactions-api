import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { DeleteBookingUseCase } from '../use-cases/delete-booking'
import { InMemoryBookingsRepository } from '../../../repositories/bookings/in-memory/in-memory-bookings-repository'

let usersRepository: InMemoryUsersRepository

let bookingRepository: InMemoryBookingsRepository
let sut: DeleteBookingUseCase

describe('Delete Booking', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    bookingRepository = new InMemoryBookingsRepository()
    sut = new DeleteBookingUseCase(bookingRepository)
  })

  it('should be able to delete booking', async () => {
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

    await sut.execute({
      bookingId: newBooking.id,
    })

    expect(bookingRepository.bookings).toHaveLength(0)
  })
})

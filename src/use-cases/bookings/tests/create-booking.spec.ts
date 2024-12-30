import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { InMemoryBookingsRepository } from '../../../repositories/bookings/in-memory/in-memory-bookings-repository'
import { CreateBookingUseCase } from '../use-cases/create-booking'

let usersRepository: InMemoryUsersRepository

let createBookingRepository: InMemoryBookingsRepository
let sut: CreateBookingUseCase

describe('Create Booking', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    createBookingRepository = new InMemoryBookingsRepository()
    sut = new CreateBookingUseCase(createBookingRepository)
  })

  it('should be able to create a new booking', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { booking } = await sut.execute({
      title: 'Entrega terça feira',
      description: 'Sistema de software cosméticos.',
      endDate: new Date(),
      status: 'processing',
      userId: user.id,
    })

    expect(booking.id).toEqual(expect.any(String))
  })
})

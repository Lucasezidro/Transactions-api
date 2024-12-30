import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { FetchAllBookingsUseCase } from '../use-cases/fetch-all-bookings'
import { InMemoryBookingsRepository } from '../../../repositories/bookings/in-memory/in-memory-bookings-repository'

let usersRepository: InMemoryUsersRepository

let bookingRepository: InMemoryBookingsRepository
let sut: FetchAllBookingsUseCase

describe('Fetch all Bookings', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    bookingRepository = new InMemoryBookingsRepository()
    sut = new FetchAllBookingsUseCase(bookingRepository)
  })

  it('should be able to fetch all bookings', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    bookingRepository.create({
      title: 'Entrega terça feira',
      description: 'Sistema de software cosméticos.',
      endDate: new Date(),
      status: 'processing',
      userId: user.id,
    })

    const { bookings } = await sut.execute({
      userId: user.id,
    })

    expect(bookings).toHaveLength(1)
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { FindUserByIdUseCase } from '../use-cases/find-user-by-id'

let usersRepository: InMemoryUsersRepository
let sut: FindUserByIdUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FindUserByIdUseCase(usersRepository)
  })

  it('should be to update a user', async () => {
    const newUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: newUser.id,
    })

    expect(user!.name).toEqual('John Doe')
  })
})
